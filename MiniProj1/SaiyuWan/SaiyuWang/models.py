from django.db import models
import os


# Create your models here.

# 从本地获取信息的方法，会从本地文件中获取相应信息
def get_local_message():
    res_message_string = ""
    f = open('files/message.txt', 'r')
    res_message_string = f.read()
    f.close()
    return res_message_string


# 接收一个字符串，用这个字符串更改本地文件
def change_local_message(write_string):
    f = open('files/message.txt', 'w')
    f.write(write_string)
    f.close()
