# 全局配置类


# Request工具类
class RequestUtils:
    adminPassword = "123"
    adminType = "admin"
    userType = "user"
    loginType = "type"
    passwordField = "auth"

    # 检查request域中管理员密码是否正确
    @staticmethod
    def isAdminRequestValid(request):
        password = request.POST.get(RequestUtils.passwordField)
        return password == RequestUtils.adminPassword

    # 检查request域的请求类型是否是用户请求
    @staticmethod
    def isUserType(request):
        return RequestUtils.userType == request.GET.get(RequestUtils.loginType)

    # 检查request域的请求类型是否是admin请求
    @staticmethod
    def isAdminType(request):
        return RequestUtils.adminType == request.POST.get(RequestUtils.loginType)


# 管理员白板，用于公式消息内容，只有有权限更改


class WhiteBoard(object):
    boardMessage = None

    def __init__(self):
        pass

    @classmethod
    def getInstance(cls):
        if not hasattr(WhiteBoard, "singleton"):
            WhiteBoard.singleton = WhiteBoard()
            WhiteBoard.singleton.boardMessage = "初始化消息..."
        return WhiteBoard.singleton

    # 管理员设置消息内容
    def setBoardMessage(self, message):
        self.boardMessage = message

    # 获取当前消息内容
    def getBoardMessage(self):
        return self.boardMessage
