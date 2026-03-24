<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'required|unique:blogs',
            'title' => 'required',
            'label' => 'required',
            'desc' => 'required',
            'date' => 'required',
            'author' => 'required',
            'read_time' => 'required',
        ]);

        $blog = Blog::create($request->all());

        return response()->json($blog, 201);
    }

    public function show(Blog $blog)
    {
        return response()->json($blog);
    }

    public function update(Request $request, Blog $blog)
    {
        $blog->update($request->all());

        return response()->json($blog);
    }

    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json(null, 204);
    }
}
