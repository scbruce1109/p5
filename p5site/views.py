from django.shortcuts import render
from django.views.generic import ListView, DetailView
# Create your views here.
from .models import Sketch


class SketchListView(ListView):
    queryset = Sketch.objects.all()
    template_name = "sketch_list.html"

    def get_context_data(self, *args, **kwargs):
        context = super(SketchListView, self).get_context_data(*args, **kwargs)
        print(context)
        return context

    def get_queryset(self, *args, **kwargs):
        request = self.request
        return Sketch.objects.all()



class SketchDetailSlugView(DetailView):
    queryset = Sketch.objects.all()
    template_name = "sketch_detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(SketchDetailSlugView, self).get_context_data(*args, **kwargs)
        # track_qs = Track.objects.all()
        # proj_list = Track.objects.get_projects()
        # context['track_qs'] = track_qs
        # context['proj_list'] = proj_list
        print(context)
        return context

    def get_object(self, *args, **kwargs):
        request = self.request
        slug = self.kwargs.get('slug')
        #instance = get_object_or_404(Product, slug=slug, active=True)
        try:
            instance = Sketch.objects.get(slug=slug)
        except Project.DoesNotExist:
            raise Http404("Not found...")
        except Project.MultipleObjectsReturned:
            qs = Project.objects.filter(slug=slug)
            instance = qs.first()
        except:
            raise Http404('uasmffmfmfmmfm!!')
        # object_viewed_signal.send(instance.__class__, instance=instance, request=request)
        return instance
