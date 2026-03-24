<?php

namespace App\Http\Controllers;

use App\Models\HomeHero;
use Illuminate\Http\Request;

class HomeHeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(HomeHero::orderBy('order')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(HomeHero $homeHero)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HomeHero $homeHero)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HomeHero $homeHero)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HomeHero $homeHero)
    {
        //
    }
}
