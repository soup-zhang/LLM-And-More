# -*- coding:utf-8 -*-
import torch
import random
import numpy as np
from transformers import set_seed
import json
import os
from typing import Optional, Dict
from torch.utils.data import Dataset


class GLMPromptDataSet(Dataset):

    def __init__(self, data_path, tokenizer, max_len, max_src_len, is_skip):
        self.all_data = []
        skip_data_number = 0
        with open(data_path, "r", encoding="utf-8") as fh:
            for i, line in enumerate(fh):
                sample = json.loads(line.strip())
                skip_flag = False

                src_tokens = tokenizer.tokenize(
                    "[Round {}]\n问：{}\n答：".format(1, sample["instruction"] + sample["input"]))

                if len(src_tokens) > max_src_len:
                    # 当输入内容超长时，随向后截断，但保留“\n答：”内容
                    src_tokens = src_tokens[:max_src_len - 3] + src_tokens[-3:]
                    skip_flag = True

                max_tgt_len = max_len - 3 - len(src_tokens)
                tgt_tokens = tokenizer.tokenize(sample["output"])

                if len(tgt_tokens) > max_tgt_len:
                    tgt_tokens = tgt_tokens[:max_tgt_len]
                    skip_flag = True

                # ChatGLM需要在输入内容后面增加"[gMASK]"、"<sop>"标记
                tokens = src_tokens + ["[gMASK]",
                                       "<sop>"] + tgt_tokens + ["<eop>"]
                input_ids = tokenizer.convert_tokens_to_ids(tokens)
                context_length = input_ids.index(tokenizer.bos_token_id)
                mask_position = context_length - 1
                labels = [-100] * context_length + \
                    input_ids[mask_position + 1:]

                assert len(input_ids) == len(labels)
                assert len(input_ids) <= max_len
                if is_skip and skip_flag:
                    skip_data_number += 1
                    continue
                self.all_data.append(
                    {"input_ids": input_ids, "labels": labels})
        print("the number of skipping data is {}".format(skip_data_number))

    def __len__(self):
        return len(self.all_data)

    def __getitem__(self, item):
        instance = self.all_data[item]
        return instance


class GLM2PromptDataSet(Dataset):
    def __init__(self, data_path, tokenizer, max_len, max_src_len, is_skip):
        self.all_data = []
        skip_data_number = 0
        with open(data_path, "r", encoding="utf-8") as fh:
            for i, line in enumerate(fh):
                sample = json.loads(line.strip())
                skip_flag = False
                src_tokens = tokenizer.tokenize(
                    "[Round {}]\n\n问：{}\n\n答：".format(1, sample["instruction"] + sample["input"]))

                if len(src_tokens) > max_src_len:
                    # 当输入内容超长时，随向后截断，但保留“\n\n答：”内容
                    src_tokens = src_tokens[:max_src_len - 4] + src_tokens[-4:]
                    skip_flag = True

                max_tgt_len = max_len - 3 - len(src_tokens)
                tgt_tokens = tokenizer.tokenize(sample["output"])

                if len(tgt_tokens) > max_tgt_len:
                    tgt_tokens = tgt_tokens[:max_tgt_len]
                    skip_flag = True

                tokens = src_tokens + tgt_tokens + ["</s>"]
                assert len(tokens) <= max_len
                # ChatGLM2需要增加[gMASK]、sop两个标记
                input_ids = [tokenizer.get_command("[gMASK]"),
                             tokenizer.get_command("sop")] + tokenizer.convert_tokens_to_ids(tokens)
                context_length = len(src_tokens) + 2
                labels = [-100] * context_length + input_ids[context_length:]

                assert len(input_ids) == len(labels)
                assert len(input_ids) <= max_len
                if is_skip and skip_flag:
                    skip_data_number += 1
                    continue
                self.all_data.append(
                    {"input_ids": input_ids, "labels": labels})
        print("the number of skipping data is {}".format(skip_data_number))

    def __len__(self):
        return len(self.all_data)

    def __getitem__(self, item):
        instance = self.all_data[item]
        return instance


class GLM3PromptDataSet(Dataset):
    def __init__(self, data_path, tokenizer, max_len, max_src_len, is_skip):
        self.all_data = []
        skip_data_number = 0
        with open(data_path, "r", encoding="utf-8") as fh:
            for i, line in enumerate(fh):
                sample = json.loads(line.strip())
                skip_flag = False

                src_tokens = [tokenizer.get_command("<|user|>")] + tokenizer.encode("\n", add_special_tokens=False) + \
                    tokenizer.encode(
                        sample["instruction"] + sample["input"], add_special_tokens=False)

                if len(src_tokens) > max_src_len:
                    # 当输入内容超长时，随向后截断
                    src_tokens = src_tokens[:max_src_len]
                    skip_flag = True

                max_tgt_len = max_len - 6 - len(src_tokens)
                tgt_tokens = [tokenizer.get_command("<|assistant|>")] + tokenizer.encode("\n", add_special_tokens=False) + \
                    tokenizer.encode(sample["output"],
                                     add_special_tokens=False)

                if len(tgt_tokens) > max_tgt_len:
                    # 当输出内容超长时，随向后截断
                    tgt_tokens = tgt_tokens[:max_tgt_len]
                    skip_flag = True

                # ChatGLM3需要增加[gMASK]、sop两个标记
                input_ids = [tokenizer.get_command("[gMASK]"),
                             tokenizer.get_command("sop")] + src_tokens + tgt_tokens + [tokenizer.eos_token_id]
                context_length = len(src_tokens) + 2
                labels = [-100] * context_length + input_ids[context_length:]

                assert len(input_ids) == len(labels)
                assert len(input_ids) <= max_len
                if is_skip and skip_flag:
                    skip_data_number += 1
                    continue
                self.all_data.append(
                    {"input_ids": input_ids, "labels": labels})
        print("the number of skipping data is {}".format(skip_data_number))

    def __len__(self):
        return len(self.all_data)

    def __getitem__(self, item):
        instance = self.all_data[item]
        return instance


class Baichuan2For13bSupervisedDataset(Dataset):
    """Dataset for supervised fine-tuning."""

    def __init__(
        self,
        data_path,
        tokenizer,
        max_len,
        max_src_len,
        is_skip,
        user_tokens=[195],
        assistant_tokens=[196],
    ):
        super(SupervisedDataset, self).__init__()
        # self.data = json.load(open(data_path))
        self.data = []

        with open(data_path, "r", encoding="utf-8") as f:
            self.data.extend([json.loads(line) for line in f])

        self.tokenizer = tokenizer
        self.model_max_length = max_len
        self.max_src_len = max_src_len
        self.is_skip = is_skip
        self.user_tokens = user_tokens
        self.assistant_tokens = assistant_tokens
        self.ignore_index = -100
        item = self.preprocessing(self.data[0])
        print(f"item['input_ids']: {item['input_ids']}")
        # print("input:", self.tokenizer.decode(item["input_ids"]))
        # labels = []
        # for id_ in item["labels"]:
        #     if id_ == -100:
        #         continue

        #     labels.append(id_)
        # print("label:", self.tokenizer.decode(labels))

    def __len__(self):
        return len(self.data)

    def preprocessing(self, example):
        input_ids = []
        labels = []
        value = f"{example['instruction']}\n{example['input']}\n回答:{example['output']}"
        if len(value) > self.max_src_len:
            # 当输入内容超长时，随向后截断
            value = value[:self.max_src_len]
            skip_flag = True
        value_ids = self.tokenizer.encode(value)
        input_ids += self.assistant_tokens + value_ids
        labels += [self.ignore_index] + value_ids

        input_ids.append(self.tokenizer.eos_token_id)
        labels.append(self.tokenizer.eos_token_id)
        input_ids = input_ids[: self.model_max_length]
        labels = labels[: self.model_max_length]
        input_ids += [self.tokenizer.pad_token_id] * (
            self.model_max_length - len(input_ids)
        )
        labels += [self.ignore_index] * (self.model_max_length - len(labels))

        return {
            "input_ids": input_ids,
            "labels": labels,
        }

    def __getitem__(self, idx) -> Dict[str, torch.Tensor]:
        return self.preprocessing(self.data[idx])


class SupervisedDataset(Dataset):
    """Dataset for supervised fine-tuning."""

    def __init__(
        self,
        data_path,
        tokenizer,
        max_len,
        max_src_len,
        is_skip,
    ):
        super(SupervisedDataset, self).__init__()
        # self.data = json.load(open(data_path))
        self.data = []

        with open(data_path, "r", encoding="utf-8") as f:
            self.data.extend([json.loads(line) for line in f])

        self.tokenizer = tokenizer
        self.model_max_length = max_len
        self.max_src_len = max_src_len
        self.is_skip = is_skip
        self.ignore_index = -100
        item = self.preprocessing(self.data[0])
        print(f"item['input_ids']: {item['input_ids']}")
        print("input:", self.tokenizer.decode(item["input_ids"]))
        labels = []
        for id_ in item["labels"]:
            if id_ == -100:
                continue

            labels.append(id_)
        print("label:", self.tokenizer.decode(labels))

    def __len__(self):
        return len(self.data)

    def preprocessing(self, example):
        input_ids = []
        labels = []
        value = f"{example['instruction']}\n{example['input']}\n回答:{example['output']}"

        if len(value) > self.max_src_len:
            # 当输入内容超长时，随向后截断
            value = value[:self.max_src_len]
            skip_flag = True

        value_ids = self.tokenizer.encode(value)
        input_ids += value_ids
        labels += [self.ignore_index] + value_ids

        input_ids.append(self.tokenizer.eos_token_id)
        labels.append(self.tokenizer.eos_token_id)
        input_ids = input_ids[: self.model_max_length]
        labels = labels[: self.model_max_length]
        if hasattr(self.tokenizer, "pad_token_id") and self.tokenizer.pad_token_id is not None:
            self.pad_token_id = self.tokenizer.pad_token_id
        else:
            self.pad_token_id = 2
        input_ids += [self.pad_token_id] * (
            self.model_max_length - len(input_ids)
        )
        labels += [self.ignore_index] * (self.model_max_length - len(labels))

        return {
            "input_ids": input_ids,
            "labels": labels,
        }

    def __getitem__(self, idx) -> Dict[str, torch.Tensor]:
        return self.preprocessing(self.data[idx])


class DataCollator(object):
    def __init__(self, tokenizer):
        self.tokenizer = tokenizer
        if hasattr(tokenizer, "pad_token_id") and tokenizer.pad_token_id is not None:
            self.pad_token_id = tokenizer.pad_token_id
        else:
            self.pad_token_id = 2
        print(f"pad_token_id: {self.pad_token_id}")

    def __call__(self, batch):
        lengths = [len(instance["input_ids"]) for instance in batch]
        batch_max_len = max(lengths)

        input_ids_batch, labels_batch = [], []
        for instance in batch:
            input_ids = instance["input_ids"]
            labels = instance["labels"]

            padding_len = batch_max_len - len(input_ids)
            input_ids = input_ids + [self.pad_token_id] * padding_len
            labels = labels + [-100] * padding_len

            input_ids_batch.append(input_ids)
            labels_batch.append(labels)

        return {"input_ids": torch.tensor(input_ids_batch, dtype=torch.long),
                "labels": torch.tensor(labels_batch, dtype=torch.long)}


def print_trainable_parameters(model):
    trainable_params = 0
    all_param = 0
    for _, param in model.named_parameters():
        num_params = param.numel()
        if num_params == 0 and hasattr(param, "ds_numel"):
            num_params = param.ds_numel

        all_param += num_params
        if param.requires_grad:
            trainable_params += num_params
    print("trainable params: {} || all params: {} || trainable%: {}".format(trainable_params, all_param,
                                                                            100 * trainable_params / all_param))


def print_rank_0(msg, rank=0):
    if rank <= 0:
        print(msg)


def to_device(batch, device):
    output = {}
    for k, v in batch.items():
        try:
            output[k] = v.to(device)
        except:
            output[k] = v
    return output


def set_random_seed(seed):
    if seed is not None:
        set_seed(seed)
        random.seed(seed)
        np.random.seed(seed)
        torch.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)


def save_model(model, tokenizer, output_dir, model_name, state_dict=None):
    save_dir = os.path.join(output_dir, model_name)
    if state_dict == None:
        model.save_pretrained(save_dir, torch_dtype=torch.float16)
    else:
        model.save_pretrained(
            save_dir, state_dict=state_dict, torch_dtype=torch.float16)
    tokenizer.save_pretrained(save_dir)
