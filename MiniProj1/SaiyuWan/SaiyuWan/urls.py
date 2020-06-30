from SaiyuWang import views#导入views模块
from django.conf.urls import url


# 这里配置的就相当于我访问对应的ip、端口 / xxx 会访问到什么方法，
# 然后访问到该方法后，views.xxx方法会给我们返回一个页面，我们再把这个页面返回给用户就可以了

urlpatterns=[
    url(r'^login/$', views.login, name='login'),
    #登录验证
    url(r'^do_login/$', views.do_login, name='do_login'),
    url(r'^admin_change_message/$', views.admin_change_message, name='admin_change_message'),
]