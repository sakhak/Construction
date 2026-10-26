<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json([
            'list' => Project::orderBy('created_at', 'DESC')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'code' => 'required|unique:projects,code',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 422);
        }

        $project = new Project();
        $this->fillProject($project, $request);
        $this->attachImage($project, $request);

        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Data created successfully!',
        ]);
    }

    public function show(string $id)
    {
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Data found!',
        ]);
    }

    public function update(Request $request, string $id)
    {
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'code' => ['required', Rule::unique('projects', 'code')->ignore($project->id)],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors(),
            ], 422);
        }

        $oldImage = $project->image;
        $this->fillProject($project, $request);
        $this->attachImage($project, $request, $oldImage);

        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Data updated successfully!',
        ]);
    }

    public function destroy(string $id)
    {
        $project = Project::find($id);

        if ($project == null) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found!',
            ], 404);
        }

        if ($project->image) {
            File::delete(public_path('Upload/projects/large/' . $project->image));
            File::delete(public_path('Upload/projects/small/' . $project->image));
        }

        $project->delete();

        return response()->json([
            'status' => true,
            'data' => $project,
            'message' => 'Data deleted successfully!',
        ]);
    }

    private function fillProject(Project $project, Request $request): void
    {
        $project->name = $request->name;
        $project->code = $request->code;
        $project->from_country = $request->from_country;
        $project->descrioption = $request->descrioption;
        $project->location = $request->location;
        $project->construction_type = $request->construction_type;
        $project->status = $request->status ?? 1;
        $project->save();
    }

    private function attachImage(Project $project, Request $request, ?string $oldImage = null): void
    {
        if (! $request->imageId) {
            return;
        }

        $tempImage = TempImage::find($request->imageId);

        if ($tempImage == null) {
            return;
        }

        $ext = pathinfo($tempImage->name, PATHINFO_EXTENSION);
        $fileName = time() . $project->id . '.' . $ext;
        $sourcePath = public_path('Upload/temp/' . $tempImage->name);

        if (! file_exists($sourcePath)) {
            return;
        }

        $manager = new ImageManager(new Driver());

        $smallPath = public_path('Upload/projects/small');
        if (! file_exists($smallPath)) {
            mkdir($smallPath, 0777, true);
        }
        $img = $manager->read($sourcePath);
        $img->coverDown(500, 600);
        $img->save($smallPath . '/' . $fileName);

        $largePath = public_path('Upload/projects/large');
        if (! file_exists($largePath)) {
            mkdir($largePath, 0777, true);
        }
        $img = $manager->read($sourcePath);
        $img->scaleDown(1200);
        $img->save($largePath . '/' . $fileName);

        $project->image = $fileName;
        $project->save();

        if ($oldImage) {
            File::delete(public_path('Upload/projects/large/' . $oldImage));
            File::delete(public_path('Upload/projects/small/' . $oldImage));
        }
    }
}
