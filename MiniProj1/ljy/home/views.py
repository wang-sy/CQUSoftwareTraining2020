from django.http import HttpResponse
from django.shortcuts import render
from home.globals import RequestUtils
from home.globals import WhiteBoard


# 用户 / admin View

# 根节点/渲染 View
def renderRoot(request):
    return render(request, "home.html")


# 处理按钮登录请求 View
# 用户和管理员使用统一接口登录，后台会自动判断逻辑并渲染页面
def doAccessRequest(request):
    # 登录类型
    if request.method == 'POST' and request.POST:
        # 检查以POST请求进入管理员页面时是否登录参数正确
        if RequestUtils.isAdminRequestValid(request) and RequestUtils.isAdminType(request):
            return render(request, "admin.html")
        else:
            return render(request, "defaultError.html")
    else:
        # 用户就懒得检查了，直接放行
        return render(request, "user.html")


# 返回当前白板公告内容
def fetchCurrentBoardMessage(request):
    return HttpResponse(WhiteBoard.getInstance().getBoardMessage())


# 设置当前白板公告内容
# 返回格式 ： 0 -> 无错误发生，白板内容更改 ; 1 -> 没有权限
def setCurrentBoardMessage(request):
    if RequestUtils.isAdminRequestValid(request) and RequestUtils.isAdminType(request):
        boardMessage = request.POST.get("boardMessage")
        WhiteBoard.getInstance().setBoardMessage(boardMessage)
        return HttpResponse(0)
    return HttpResponse(1)
