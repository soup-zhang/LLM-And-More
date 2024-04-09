#!/bin/bash

# Python脚本执行的参数
EVAL_DIMENSIONS='["inference_ability", "reading_comprehension", "chinese_language_skill", "command_compliance", "innovation_capacity"]'
OPTIONS='{"additional_parameters": {"max_seq_len": 512}}'
DATASET_OUTPUT_FILE="/app/eval/eval-model-result.json"

cd /app/eval/

function set_cuda_devices {
    # 验证输入是否为空
    if [ -z "$1" ]; then
        echo "Error: No argument provided."
        echo "Usage: set_cuda_devices <number_of_gpus>"
        exit 1
    fi

    if ! [[ "$1" =~ ^[0-9]+$ ]]; then
        echo "Error: Invalid argument. Please provide a positive integer."
        exit 1
    fi

    # 使用循环动态构建
    devices=$(printf ",%d" $(seq 0 $(($1-1)) | sed 's/ //g'))
    export CUDA_VISIBLE_DEVICES=${devices:1}
}
set_cuda_devices $GPUS_PER_NODE

# 执行 Python 脚本并捕获输出和退出状态
output=$(deepspeed  evaluate_model_from_five_dimensions.py \
  --model_name_or_path="${MODEL_PATH}" \
  --gpu_nums $GPUS_PER_NODE \
  --evaluation_dimensions="${EVAL_DIMENSIONS}" \
  --output_file ${DATASET_OUTPUT_FILE} \
  --options="${OPTIONS}" 2>&1)
status=$?

# 根据退出状态判断执行是否异常
if [ $status -eq 0 ]; then
    # 没有发生异常，正常输出内容
    echo "执行成功，输出内容："
    echo "${output}"
    job_status="success"
    # 调用API并传递输出内容
#    content=$(<"${DATASET_OUTPUT_FILE}")
    json_content=$(jq -c '.' "$DATASET_OUTPUT_FILE")
    new_json=$(jq -n --argjson content "$json_content" '{"status": "success", "data": $content}')
    curl -X PUT ${API_URL} -H "Authorization: ${AUTH}" -H "X-Tenant-Id: ${TENANT_ID}" -H "Content-Type: application/json" -d "${new_json}"
else
    # 发生异常
    echo "执行失败，错误信息："
    echo "${output}"
    job_status="failed"
    # 调用API并传递错误信息
    curl -X PUT ${API_URL} -H "Authorization: ${AUTH}" -H "X-Tenant-Id: ${TENANT_ID}" -H "Content-Type: application/json" -d "{\"status\": "${job_status}", \"message\": \"${output}\"}"
fi

rm -rf $DATASET_OUTPUT_FILE