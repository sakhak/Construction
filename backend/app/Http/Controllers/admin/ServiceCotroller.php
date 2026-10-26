<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ServiceCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $service = Service::all();
        return response()->json([
            "list" => $service
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),[
            "name" =>"required" ,
            "code"=>"required|unique:services,code",
            "price"=>"required|numeric",
            
        ]);
        if($validate->fails()){
            return response()->json([
                "status"=>false,
                "message"=> $validate->errors(),
            ]);
        }
        $service = new Service();
        $service->name = $request->name;
        $service->code = $request->code;
        $service->from_country = $request->from_country;
        $service->description = $request->description;
        $service->price = $request->price;
        $service->status = $request->status;
        $service->save();

         if($request->imageId>0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$service->id.'.'.$ext;

                $uploadPath = public_path('Upload/temp');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                // Small Image
                $sourcePath = $uploadPath . '/' . $tempImage->name;
                $thumbPath = public_path('Upload/services/small');
                if (!file_exists($thumbPath)) {
                    mkdir($thumbPath, 0777, true);
                }
                $destPath = $thumbPath . '/' . $fileName;
                $manager = new ImageManager(new Driver());
                $img = $manager->read($sourcePath);
                $img->coverDown(500, 600);
                $img->save($destPath);

                // Large Image
                $thumbPath = public_path('Upload/services/large');
                if (!file_exists($thumbPath)) {
                    mkdir($thumbPath, 0777, true);
                }
                $destPath = $thumbPath . '/' . $fileName;
                $manager = new ImageManager(new Driver());
                $img = $manager->read($sourcePath);
                $img->scaleDown(1200);
                $img->save($destPath);

                $service->image = $fileName;
                $service->save();
            }

        }

        return response()->json([
            "status"=>true,
            'data'=> $service,
            "message"=> "Data created successfully!"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::find($id);
        if($service ==false){
            return response()->json([
                "status"=>false,
                "message"=> 'Data not found!',
            ]);

        }
        return response()->json([
            "status"=>true,
            'data'=>$service,
             "message"=> 'Data found!',
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::findOrFail($id);

        if($service == null){
            return response()->json([
                "status"=>false,
                "message"=> 'Data not found!',
            ]);

        }
        $validate = Validator::make($request->all(),[
            "name" =>"required" ,
            "code"=> ["required", Rule::unique('services', 'code')->ignore($service->id)],
            "price"=>"required|numeric",
        ]);
        if($validate->fails()){
            return response()->json([
                "status"=>false,
                "message"=> $validate->errors(),
            ]);
        }
        $service->name = $request->name;
        $service->code = $request->code;
        $service->from_country = $request->from_country;
        $service->description = $request->description;
        $service->price = $request->price;
        $service->status = $request->status;
        $service->save();

        if($request->imageId>0){
            $oldImage = $service->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null){
                $extArray = explode('.',$tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$service->id.'.'.$ext;

                $uploadPath = public_path('Upload/temp');
                if (!file_exists($uploadPath)) {
                    mkdir($uploadPath, 0777, true);
                }

                // Small Image
                $sourcePath = $uploadPath . '/' . $tempImage->name;
                $thumbPath = public_path('Upload/services/small');
                if (!file_exists($thumbPath)) {
                    mkdir($thumbPath, 0777, true);
                }
                $destPath = $thumbPath . '/' . $fileName;
                $manager = new ImageManager(new Driver());
                $img = $manager->read($sourcePath);
                $img->coverDown(500, 600);
                $img->save($destPath);
                
                // Large Image
                $thumbPath = public_path('Upload/services/large');
                if (!file_exists($thumbPath)) {
                    mkdir($thumbPath, 0777, true);
                }
                $destPath = $thumbPath . '/' . $fileName;
                $manager = new ImageManager(new Driver());
                $img = $manager->read($sourcePath);
                $img->scaleDown(1200);
                $img->save($destPath);

                $service->image = $fileName;
                $service->save();
                if($oldImage != ''){
                    File::delete(public_path('Upload/services/large/'.$oldImage));
                    File::delete(public_path('Upload/services/small/'.$oldImage));
                }
            }

        }

        return response()->json([
            "status"=>true,
            "data"=> $service,
            "message"=> "Data updated successfully!"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       try {
        $service = Service::findOrFail($id);

        $service->delete();
        return response()->json([
            "status" => true,
            "data" => $service,
            "message" => "Data deleted successfully!",
        ]);

    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json([
            "status" => false,
            "message" => "Data not found!",
        ], 404);
    }
    }
}
