<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Package::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => 'required|unique:packages',
            'title' => 'required',
            'region' => 'required',
            'price' => 'required',
            'price_num' => 'required|numeric',
            'desc' => 'required',
            'duration' => 'required',
            'min_pax' => 'required|integer',
            'max_pax' => 'required|integer',
            'category' => 'required',
        ]);

        $package = Package::create($request->all());

        return response()->json($package, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        return response()->json($package);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Package $package)
    {
        $package->update($request->all());

        return response()->json($package);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        $package->delete();

        return response()->json(null, 204);
    }
}
