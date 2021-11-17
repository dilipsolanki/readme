<script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<x-backendapp>

    <div class="py-12">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-xl sm:rounded-lg">
                <x-error-message :errors="$errors"></x-error-message>
                <div class="container mx-auto mt-8 bg-white shadow-md">
                    <div class="flex items-end justify-between px-4 py-3 text-white bg-gray-700 rounded-t">
                        <h2 class="pb-1">Edit Navigation ()</h2>
                        <a href="{{ route('backend.navigation.index') }}" class="px-2 py-1 text-sm text-gray-900 bg-gray-200 rounded hover:bg-gray-100">Back to all tool navigations</a>
                    </div>

                    <form method="POST" id="aboutFormEdit" action="{{ route('backend.navigation.update', $toolNavigationEdit->id) }}" class="w-full p-4">
                        @method('PUT')
                        @csrf
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Navigation Name
                                </label>
                            </div>
                            <div class="md:w-2/3">
                            <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-left md:mb-0" for="inline-full-name">
                                     {{ $toolNavigationEdit->nav_name }}
                                </label>
                              
                            </div>
                        </div>
                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                            
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Tool Name
                                </label>
                            </div>
                            <div class="md:w-2/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-left md:mb-0" for="inline-full-name">
                                     {{ $toolNavigationEdit->toolName }}
                                </label>
                            </div>
                        </div>

                        <div class="mb-6 md:flex md:items-center">
                            <div class="md:w-1/3">
                                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-full-name">
                                    Content
                                </label>
                            </div>
                            <!-- <div class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" 
                             contenteditable="true"> </div> -->
                             <!-- <div class="md:w-2/3">
                                <input class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200"
                                 id="inline-full-name" type="text" value="{{ $toolNavigationEdit->content }}" name="content">
                            </div> 
                            <div class="md:w-2/3">
                                <textarea rows="7" class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded appearance-none focus:outline-none focus:bg-white focus:border-blue-200" 
                                 value="{{ $toolNavigationEdit->content }}"  name="content"></textarea>
                            </div> -->
                           

                            <div class="md:w-2/3">
                            <input type='hidden' name='content' id="hiddenContent">
                            </div>
                        </div>
                        <div class="w-full">
            <!-- Create the editor container -->
            <div id="editor" class="w-full" >
              {!! $toolNavigationEdit->content !!} 
             
            </div>
            </div>
                        <div class="md:flex md:items-center">
                            <div class="md:w-1/3"></div>
                            <div class="md:w-2/3">
                                <button class="px-2 py-1 text-white bg-blue-500 rounded shadow hover:bg-blue-400 focus:shadow-outline focus:outline-none" type="submit">
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Include the Quill library -->
<script>

<!-- Initialize Quill editor -->
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
var form = document.getElementById('aboutFormEdit');
 form.onsubmit = function() {   
  // Populate hidden form on submit
   var about = document.getElementById('hiddenContent');
   about.value = editor.root.innerHTML;
   
};
</script>
</x-backendapp>