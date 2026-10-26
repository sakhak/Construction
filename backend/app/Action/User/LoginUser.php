<?php
namespace App\Action\User;

use App\Models\User;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginUser
{
    public function login( array $data) 
    {

        $credentails = $this->validateData($data);

        if(!Auth::attempt($credentails)){
            return response()->json([
                'status'=> false,
                'error'=>"Invalid credentails"()
            ],404);
        }

                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;
                return response()->json([
                    'status'=>true,
                    'token'=>$token,
                    'id'=>Auth::user()->id,
                ]);

        }
        private function validateData(array $data){
        return validator($data,[
                'email'=>'required|email',
                'password'=> 'required',
        ])->validate();

    }
}