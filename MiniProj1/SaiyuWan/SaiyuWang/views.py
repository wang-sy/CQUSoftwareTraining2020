from django.shortcuts import render
from . import models
from django.shortcuts import HttpResponse


# Create your views here.

# 进入登陆界面返回一个简单的登陆页面
def login(request):
    return render(request, 'login.html')


# 直接返回管理员进入的页面
def goto_admin_view_page(request):
    return render(
        request, 'admin_view_page.html'
    )


# 用于返回用户看到的信息
def goto_user_view_page(request):
    return render(
        request, 'user_view_page.html',
        {
            'message_string': models.get_local_message()
        }
    )


# 登陆界面中的登陆判断功能（这里不涉及到数据库，直接写死就可以了）
def do_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    print(username, password)
    # 根据用户名、密码来判断用户属于哪种用户
    # 管理员用户，返回管理员界面，可以进行操作、编辑
    if username == 'admin' and password == '123456':
        return goto_admin_view_page(request)
    # 普通用户，返回包含本地信息的用户界面，只能进行查看
    elif username == 'user' and password == '123456':
        return goto_user_view_page(request)
    # 都不是代表没有这个用户，需要重新登陆，并且带有错误标识
    else:
        return render(
            request, 'login.html'
        )


# 接收管理员改变信息要求的函数
def admin_change_message(request):
    new_message = request.POST.get('new_message')
    models.change_local_message(new_message)
    return goto_admin_view_page(request)
