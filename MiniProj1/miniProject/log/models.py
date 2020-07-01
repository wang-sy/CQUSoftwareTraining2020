from django.db import models
import os

# Create your models here.

def get_message() :
    f = open('message.txt', 'r')
    temp = f.read()
    f.close()
    return temp

def change_message(temp) :
    f = open('message.txt', 'w')
    f.write(temp)
    f.close()