<?php

namespace App\Http\Controllers;

use App\Action\User\LoginUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function Login(Request $request, LoginUser $loginUser){
        try{

            return $loginUser->login($request->all());
        }catch(ValidationException $e){
            return response()->json([
                "status"=> false,
                "message"=> $e->errors(),
            ],422);
        }catch(\Exception $e){
            return response()->json([
                "message"=>"Login false",
                "error" => $e->getMessage(),
            ],500);
        }
    }
    public function Logout(){
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();
        return response()->json([
                    'status'=> true,
                    'message'=>'Logout successfully!'
                ]);
    }
}
