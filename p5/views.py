from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth import authenticate, login, get_user_model

from django.conf import settings

ting = settings.MEDIA_ROOT

def home_page(request):
    context = {
        "title":"Split Cloud Productions",
        "content":"Homepage",
    }

    return render(request, "home.html", context)


def array_save_view(request):
    notes = request.POST.get('content')
    print(request.POST.get('title'))
    ntitle = ntitle.strip().replace(' ', '_')
    with open(ntitle +'.txt', 'w') as file:
        file.write(content)
    file.close()

    if request.is_ajax():
        json_data = {
            "success": 'yes',
        }
        return JsonResponse(json_data)
