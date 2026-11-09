<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * Handle project image upload.
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp,gif,svg|max:10240',
        ]);

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = 'proj_' . time() . '_' . Str::random(8) . '.' . $extension;

        // Destination folder inside public
        $destinationPath = public_path('uploads/projects');

        if (! file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }

        $file->move($destinationPath, $filename);

        $url = url('uploads/projects/' . $filename);

        return response()->json([
            'url' => $url,
            'filename' => $filename,
            'message' => 'Image uploaded successfully',
        ]);
    }
}

