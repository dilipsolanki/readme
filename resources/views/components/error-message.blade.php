@props(['errors'])
@if (count($errors) > 0)
    <div class="bg-red-50 p-2 rounded text-red-600 mb-4 border border-red-300">
        <ul>
            @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif