from django.shortcuts import render
from . import models
from django.shortcuts import HttpResponse
# Create your views here.

def log(request) :
    return render(request, 'log.html')

def to_admin (request) :
    return render(request, 'admin.html')

def to_user (request) :
    return render(
        request, 'user.html',
        {
            'message' : models.get_message()
        }
    )

def log_in(request) :
    mode = request.POST.get('mode')
    if mode == '2' :
        return to_admin(request)
    elif mode == '1' :
        return to_user(request)
    else :
        return render(request, 'log.html')

def admin_changed(request) :
    new_meeage = request.POST.get('new_message')
    models.change_message(new_meeage)
    return to_admin(request)
