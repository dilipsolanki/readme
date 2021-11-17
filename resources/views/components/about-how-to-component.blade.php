<button
    class="text-blue-600 cursor-pointer px-2"
    wire:click='$emit("openModal", "about-tool", {{ json_encode(["navType" => "$navType", "toolName" => "$toolName"]) }})'>
    {{ Str::headline($navType) }}
</button>