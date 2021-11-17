<script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<x-backendapp>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Tool Navigation') }}
        </h2>
    </x-slot>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-xl sm:rounded-lg">
            
                <x-error-message :errors="$errors"></x-error-message>

                <div class="container mx-auto mt-8 bg-white shadow-md">
                    <div class="flex items-end justify-between bg-gray-700 px-4 py-3 rounded-t text-white">
                        <h2 class="pb-1 font-semibold">Add Navigation</h2>
                        <a href="{{ route('backend.permissions.index') }}"
                            class="bg-blue-500 hover:bg-blue-200 hover:text-blue-800 px-2 py-1 rounded text-white text-sm">Back to all navigations</a>
                    </div>

                    <form id=aboutForm method="POST" action="{{ route('backend.navigation.store') }}" class="p-4 w-full">
                        @csrf
                      

                        <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                                <label for="navigation" class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                    Navigation Title
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <div>
                                <select name="navigation" id="navigation">
                                    <option value="about">About</option>
                                    <option value="how_to">How to</option>
                            
                                    </select>
                                </div>
                                
                            </div>
                        </div>


                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-link">
                                    Link
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <select name="route_name" class="bg-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" id="inline-link">
                                    @foreach ($routes as $key => $route)
                                    <option value="{{ $key }}">{{ $route }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-short-desc">
                                    Content :
                                </label>
                            </div>
                        </div>
             <div>
                            <div class="md:w-2/3">
                            <input type='hidden' name='content' id="hiddenContent">
                            </div>
                                                <!-- Include Quill stylesheet -->
               
                    
             <div class="w-full">
            <!-- Create the editor container -->
            <div id="editor" class="w-full">
           
            </div>
            </div>



         </div>
      </div>
  



                        <div class="md:flex md:items-center hfull">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                                <button
                                    class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white py-1 px-2 rounded"
                                    type="submit">
                                    Save
                                </button>
                            </div>
                        </div>
                        <br>
                        <br>
                    </form>

                </div>
            </div>
        </div>
    </div>





<!-- Initialize Quill editor -->
<script>

/** Add the following toolbar for the editor */
  var editor = new Quill('#editor', {
   modules: {
    toolbar: [
      ['bold', 'italic','underline', 'strike',],
      ['link', 'blockquote', 'code-block', 'image'],
     [ {size: [ 'small', false, 'large', 'huge' ]}],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Add your about us content here...',
  theme: 'snow'
  });
  

  /** Select form and copy the content */
var form = document.getElementById('aboutForm');
 form.onsubmit = function() {   
  // Populate hidden form on submit
   var about = document.getElementById('hiddenContent');
   about.value = editor.root.innerHTML;
   
};
</script>
</x-backendapp>
