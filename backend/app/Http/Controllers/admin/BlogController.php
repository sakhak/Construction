<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json([
            'list' => Blog::orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:blogs,slug',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 422);
        }

        $blog = new Blog();
        $this->fillBlog($blog, $request);
        $this->attachImage($blog, $request);

        return response()->json([
            'status' => true,
            'data' => $blog,
            'message' => 'Data created successfully!',
        ]);
    }

    public function show(string $id)
    {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $blog,
            'message' => 'Data found!',
        ]);
    }

    public function update(Request $request, string $id)
    {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => ['required', Rule::unique('blogs', 'slug')->ignore($blog->id)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 422);
        }

        $oldImage = $blog->image;
        $this->fillBlog($blog, $request);
        $this->attachImage($blog, $request, $oldImage);

        return response()->json([
            'status' => true,
            'data' => $blog,
            'message' => 'Data updated successfully!',
        ]);
    }

    public function destroy(string $id)
    {
        $blog = Blog::find($id);

        if ($blog == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        if ($blog->image) {
            File::delete(public_path('Upload/blogs/large/' . $blog->image));
            File::delete(public_path('Upload/blogs/small/' . $blog->image));
        }

        $blog->delete();

        return response()->json([
            'status' => true,
            'data' => $blog,
            'message' => 'Data deleted successfully!',
        ]);
    }

    private function fillBlog(Blog $blog, Request $request): void
    {
        $blog->title = $request->title;
        $blog->slug = $request->slug;
        $blog->author = $request->author;
        $blog->short_description = $request->short_description;
        $blog->content = $request->content;
        $blog->status = $request->status ?? 1;
        $blog->save();
    }

    private function attachImage(Blog $blog, Request $request, ?string $oldImage = null): void
    {
        if (! $request->imageId) {
            return;
        }

        $tempImage = TempImage::find($request->imageId);

        if ($tempImage == null) {
            return;
        }

        $sourcePath = public_path('Upload/temp/' . $tempImage->name);

        if (! file_exists($sourcePath)) {
            return;
        }

        $ext = pathinfo($tempImage->name, PATHINFO_EXTENSION);
        $fileName = time() . $blog->id . '.' . $ext;
        $manager = new ImageManager(new Driver());

        $smallPath = public_path('Upload/blogs/small');
        if (! file_exists($smallPath)) {
            mkdir($smallPath, 0777, true);
        }
        $img = $manager->read($sourcePath);
        $img->coverDown(500, 350);
        $img->save($smallPath . '/' . $fileName);

        $largePath = public_path('Upload/blogs/large');
        if (! file_exists($largePath)) {
            mkdir($largePath, 0777, true);
        }
        $img = $manager->read($sourcePath);
        $img->scaleDown(1200);
        $img->save($largePath . '/' . $fileName);

        $blog->image = $fileName;
        $blog->save();

        if ($oldImage) {
            File::delete(public_path('Upload/blogs/large/' . $oldImage));
            File::delete(public_path('Upload/blogs/small/' . $oldImage));
        }
    }
}
