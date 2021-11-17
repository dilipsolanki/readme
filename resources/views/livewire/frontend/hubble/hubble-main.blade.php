<div class="flex w-full bg-blue-100 h-screen flex-wrap" x-data="{
        contentToHubble: @entangle('hubble.originalMessage'),
        fetchId: @entangle('hubble.fetch_id'),
        hubbleId: @entangle('hubble.id'),
        selectedSuggestionNo:null,
        selectLang : @entangle('hubbleConfigOptions.language_pref'),
        chunkEditSuppression: @entangle('hubbleConfigOptions.chunk_edits'),
        sideBarExist: true,
        openSideBar: true,
        selectModel: @entangle('hubbleConfigOptions.model'),
        isFetchIdForFile: @entangle('isFetchIdForFile'),
        selected_tab: $persist('content'),
        showHideRevisionSummaryContainer: false,
        showHideRevisionSummary: @entangle('showHideRevisionSummary'),
        ...hubbleUtils
    }" x-init="$watch('selectedSuggestionNo', resetSuggestionPanel);setFocuOnEnteredText()" @fetch-id-rcvd-from-hubble="window.history.replaceState(null, null, '/hubble/' + $event.detail.fetch_id_from_hubble);" @hubble-file-is-ready-download-it="window.open($event.detail.file_download_url, '_blank');" @thousand-words-found.window="selected_tab='content'" @revision-summary-ready="showHideRevisionSummaryContainer=true;">
    <!-- <div
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-60"
        x-show="openSideBar"
    >
    </div> -->
    @include('frontend.hubble.secondary-nav')
    <form wire:submit.prevent="letsHubble" class="grid w-full grid-cols-6 gap-1 h-full" id="hubbleFormContainer">
        @include('frontend.hubble.preferences')
        <div class="p-6 col-span-6 h-96 overflow-y-auto md:overflow-y-visible md:col-span-3 border-b border-gray-400 md:border-0 hubblebox">
            <div id="hubblebox_inner" class="text-gray-800">
                @if($hubbling)
                <div>
                    @includeIf('frontend.hubble.revision-summary-loading')
                </div>
                @endif
                @include('frontend.hubble.revision-summary')

                @include('frontend.hubble.content')
                @if($fileDownloadLink == '' && empty($hubble['fetch_id']))
                @include('frontend.hubble.file-upload')
                @endif
            </div>
        </div>
        <div id="hubbleSuggestionBox" class="col-span-6 md:col-span-2 py-6 md:pr-5 rounded px-2 hubbleSuggestionBox">
            <input type="text" wire:model="$showSuggestions" class="hidden" />

            @if(!$showSuggestions && $hubbleConfigOptions['wordCount'] > 0 && !$checkingForExistingFetchId)
            @livewire('hubble.check-status-for-fetch-id', ['hubble' => $hubble])
            @endif

            @if($showSuggestions)
            @livewire('hubble.suggestions', ['hubble' => $hubble])
            @endif

            @if($hubbling && $hubbleConfigOptions['wordCount'] == 0)
            @livewire('hubble.check-status-for-uploaded-file-using-fetch-i-d', ['hubble' => $hubble])
            @endif

            @if($fileDownloadLink != '')
            <div class="justify-center space-y-2 flex relative items-start">
                <div class="absolute inset-x-0 text-center w-full bg-white px-4 py-8 shadow rounded">
                    <div class="text-center w-full mb-2">
                        Your edited file is ready to download with track changes.
                    </div>
                    <a href="#" wire:click.prevent="hubbleFileDownloadLink" class="bg-green-700 text-white px-2 py-1 rounded cursor-pointer hover:bg-opacity-80">Download {{ $uploadedFileName }}</a>
                </div>
            </div>
            @endif
        </div>
    </form>
</div>
<script>
    // var div = document.getElementById('enteredText');
    // setTimeout(function () {
    //     div.focus();
    // }, 0);

    document.getElementById('enteredText').addEventListener("paste", function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    });

    const hubbleUtils = {
        resetSuggestionPanel() {
            // this.selectedSuggestionNo = null;
            document.querySelectorAll('.suggestionBox').forEach(function(element) {
                element.style.setProperty("display", "none", "important")
            });
        },
        setFocuOnEnteredText() {
            if (this.fetchId) {
                this.selected_tab = 'content';
                if (this.isFetchIdForFile)
                    this.selected_tab = 'file-upload';
                this.showHideRevisionSummaryContainer = true;
            }
            var div = document.getElementById('enteredText');
            setTimeout(function() {
                div.focus();
            }, 0);
        },
        generateSampleText() {
            var hubbleSampleText = ["Tumor angiogenesis and tumor immune microenvironment are 2 important research branches of TME, anti-angiogenic therapy and immunotherapy has gradually become one important focus of cancer treatment research. More interestingly, more and more number of studies has indicated that there are complex regulatory interactions between the two treatment strategies with multiple regulatory mechanisms involved.",
                "All animals resumed normal behavior including feeding 3 hrs after surgery and were given a pause of at least 3 days until before first training. Electrodes were connected to a amplifier via connector and a cable. Two further parietal skull screws served as reference/ground electrodes. ECoG signals were amplified 10.000 times, low-pass filtered at 100 Hz, and digitized at rate of sampling of 500 Hz.",
                "None of any animals showed any sign of pain, became ill, or died before the experiment's ended. After the experiment, animals were highly anesthetized with pentobarbital (Sigma, Taufkirchen, Germany), and then killed by intrapulmonary injection of T61 (Hoechst).",
                "The inhibition of dendritic cell (DC) differentiation and maturation is one of the prominent manifestations of VEGF immunosuppressive function. Oyama et al. noted as early as 1998 that VEGF can combine with VEGFR-2 on DC surface to inhibit DC maturation by inhibiting the nuclear factor-κB signaling pathway. Also, Alfaro et al. demonstrated that VEGF has inhibiting effect on the differentiation of monocytes into DCs, they further confirmed that the use of Bevacizumab, an antiVEGF monoclonal antibody, or Sorafenib, a VEGF tyrosine kinase inhibitor (TKI), can completely restore the normal differentiation of DCs.",
                "For instance, it was found that VEGF can increase the presence of both MDSCs and Tregs in TME in a VEGFR-2-dependent manner. Besides, Terme et al. demonstrated that VEGF-A was capable to trigger Tregs proliferation, this proliferation effect can be inhibited by VEGF-A/VEGFR-2 blockade.",
                "Positive bias indicates overestimation and negative bias underestimation of success probability. Generally, the magnitude of bias increased with window size. Particularly large positive and negative bias even for small windows was found in the first five trials of sessions two and three.",
                "African Swine Fever Virus (ASFV) is an enveloped double stranded DNA virus that causes a hemorrhagic disease in domestic pigs and wild boar with a rate of mortality approaching 100%. There is no vaccine or drugs for ASFV available, and control methods include preventive biosecurity and mass slaughter in the case of an outbreak.",
                "The efficacy of protection of two adenovirus vectored ASFV antigen cocktails was evaluated as an extension of previous work which performed an evaluation of safety, tolerability, and immunogenicity of these immunogens.",
                "A sudden surge has been arised in the number of studies focusing in the design and synthesis of hybrids for treating of malaria, and this may be regarded as proof of their advantages over artemisinin-based combination therapy (ACT). Recent studies have suggested that manner in which HCT behaves biologically could be anticipated by examining lower toxicity enhancement, better pharmacokinetics markers, and signal intensity (SI) in sulfadoxine-enhanced images.",
                "In the more recent past, the endoperoxide sesquiterpene lactone-artemisinin (lactone-ART) (and its derivatives) became the main for treating malaria. They were considered to represent the only potential class of drugs available to vitiate the impact of multidrug resistant strains of Plasmodium. The World Health Organization (WHO), over the last decade, has been advocating for deploying artemisinin-based combination therapy (ACT) as the gold standard” for treatment of all malaria infections in areas afflicted by Plasmodium falciparum.",
                "We perform evaluation of these methods in comparison with the conventional analysis. For this purpose, we utilize simulated and experimental data derived from an exemplary learning experiment, in which rodents were trained in a two way active avoidance paradigm in a shuttle-box.",
                "It was done in three consecutive sessions with maximum two sessions per each day separated by a pause of at least 2 hours. The remaining of session was performed on the following day. Each session consisted of 60 trials and lasted about 30 mins."
            ];
            document.getElementById('enteredText').innerHTML = hubbleSampleText[Math.floor(Math.random() * hubbleSampleText.length)];
        }
    }

    window.hubbleUtils = hubbleUtils;
</script>
