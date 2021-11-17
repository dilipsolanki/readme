<?php /** @var \Glhd\Gretel\View\BreadcrumbCollection|\Glhd\Gretel\View\Breadcrumb[] $breadcrumbs */ ?>

@unless ($breadcrumbs->isEmpty())
	<nav aria-label="Breadcrumb">
		<ol class="px-5 py-3 rounded flex flex-wrap  text-sm font-semibold">
			@foreach ($breadcrumbs as $breadcrumb)
				<li class="{{ $inactiveClass('mr-3') }}">
					<div class="flex items-center">
						<a class="text-gray-500 hover:text-gray-800" {{ $href() }} {{ $ariaCurrent() }}>
							{{ $breadcrumb->title }}
						</a>
						@unless($loop->last)
							<span aria-hidden="true" class="text-gray-400 ml-3 select-none">
								<x-bi-chevron-right></x-bi-chevron-right>
							</span>
						@endunless
					</div>
				</li>
			@endforeach
		</ol>
	</nav>
@endunless
