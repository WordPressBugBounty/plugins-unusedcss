<template>
  <main>
    <div class="rl-container mx-auto bg-white border-solid border border-gray-border-line inline-grid rounded-lg">
      <messageBox></messageBox>
      <div class="flex border-y border-gray-border-line p-4 mb-6 pr-8 border-t-0">
        <div class="flex-initial w-28 pl-8">
          <RouterLink :to="back">
            <button id="rp-back"
                class="bg-white transition duration-300 hover:bg-purple-lite hover:text-white rounded-full px-3 py-3 text-center inline-flex items-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5833 14H7M7 14L14 7M7 14L14 21" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </RouterLink>
        </div>
        <div class="flex mt-1">
          <div>
            <h1 class="font-medium text-base text-black-font">Unused CSS Settings</h1>
            <p class="text-sm text-gray-font">Remove unused css and generate optimized css files with only used CSS</p>
          </div>
        </div>
      </div>

      <div>
        <div class="pl-32 pr-72">

          <div class="mt-5">
            <h1 class="font-normal text-base text-black-font ">Force Include selectors</h1>
            <p class="text-sm pb-3 text-gray-font">These selectors will be forcefully included into optimization.</p>

            <div class="grid mb-5">
                <textarea
                    v-model="onData.uucss_safelist"
                    @focus="focus='safe'" @blur="focus = null"
                    class="resize-none z-10 appearance-none border border-gray-button-border rounded-lg w-full py-2 px-3 h-20 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    id="force-include" type="text" placeholder=""></textarea>
              <div :class="focus==='safe'? 'bg-purple-lite':'bg-gray-lite-background'"
                   class="-mt-3  rounded-lg px-4 py-4 pb-2" role="alert">
                <p class="text-sm text-dark-gray-font">One selector rule per line. You can use wildcards as well ‘elementor-*, *-gallery’ etc...</p>
              </div>
            </div>

          </div>

          <div class="mt-5">
            <h1 class="font-normal text-base text-black-font ">Force Exclude selectors</h1>
            <p class="text-sm pb-3 text-gray-font">These selectors will be forcefully removed from optimization.</p>

            <div class="grid mb-5">
                <textarea
                    v-model="onData.uucss_blocklist"
                    @focus="focus='block-list'" @blur="focus = null"
                    class="resize-none z-10 appearance-none border border-gray-button-border rounded-lg w-full py-2 px-3 h-20 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple focus:border-transparent"
                    id="force-include" type="text" placeholder=""></textarea>
              <div :class="focus==='block-list'? 'bg-purple-lite':'bg-gray-lite-background'"
                   class="-mt-3  rounded-lg px-4 py-4 pb-2" role="alert">
                <p class="text-sm text-dark-gray-font">One selector rule per line. You can use wildcards as well ‘elementor-*, *-gallery’ etc...</p>
              </div>
            </div>

          </div>


          <h1 class="font-normal text-base text-black-font">Selector Packs (formally Safelist Packs)</h1>
          <p class="text-sm pb-3 text-gray-font">Selector packs contain predefined force exclude and include rules for plugins and themes.</p>
          <div class="grid mb-5">
            <div class="w-[682px] flex text-sm z-10">
              <vue3-tags-input :tags="whitelist_render"
                               v-model="filterText"
                               @on-tags-changed="handleChangeTag"
                               @click="focus='tag'"
                               :class="focus==='tag'? 'focus-tags': ''"
                               class="flex resize-none appearance-none border border-gray-button-border rounded-lg w-full p-1 text-gray-700 leading-tight focus:outline-none focus:border-transparent"
                               placeholder="Type to add your plugin..."/>


              <div class="mt-3 -ml-9 cursor-pointer">
                <svg :class="{'animate-spin': refresh_element}" @click="loadWhitelistPacks"
                     class="fill-none transition ease-in-out" width="20px" height="20px"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 13 13">
                  <g class="" clip-path="url(#clip0_49_525)">
                    <path
                        d="M11.466 4.33334C10.6301 2.42028 8.72122 1.08334 6.5 1.08334C3.6913 1.08334 1.38187 3.22113 1.11011 5.95834"
                        stroke="#7F54B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.20825 4.33333H11.5916C11.7711 4.33333 11.9166 4.18783 11.9166 4.00833V1.625"
                          stroke="#7F54B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M1.56079 8.66666C2.39665 10.5797 4.30557 11.9167 6.52676 11.9167C9.33546 11.9167 11.6449 9.77886 11.9167 7.04166"
                        stroke="#7F54B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.81844 8.66666H1.43511C1.25562 8.66666 1.11011 8.81215 1.11011 8.99166V11.375"
                          stroke="#7F54B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>

                </svg>
              </div>
            </div>


            <div :class="focus==='tag'? 'bg-purple-lite':'bg-gray-lite-background'" class="-mt-3 bg-purple-lite rounded-lg px-4 py-4 pb-2" role="alert">
              <p class="text-sm text-dark-gray-font flex"> Click on reload or type and select to load packs.</p>
            </div>

          </div>
          <div v-if="focus === 'tag'" class="transition duration-300 rounded-lg -mt-[50px] w-[682px] grid absolute z-50" :class="focus === 'tag' ? 'bg-purple-lite' : 'bg-gray-lite-background'" v-click-away="clickOutside">
            <div class="p-1 pl-2 rounded-lg hover:cursor-pointer hover:bg-purple hover:text-white" v-for="select in filteredList" :key="select" @click="selectPacks(select)">
              {{ select }}
            </div>
          </div>




          <div class="flex mt-5 pb-1 transition duration-300 hover:cursor-pointer rounded" @click="onData.misc_options.default=!onData.misc_options.default">
            <div class="pr-1">
              <div class="flex items-center mr-4 mt-3">

                <svg class="ml-[-3px]" :class="{'advanced-after': onData.misc_options.default , 'advanced-before' : !onData.misc_options.default }" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z" fill="#030D45"/>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="font-normal text-base text-black-font">Misc Options</h1>
              <p class="text-sm text-gray-font">RapidLoad crawler will use following options for optimization.</p>
            </div>
          </div>

          <div :class="{ expand: onData.misc_options.default}" class="mt-3 pl-6 not-expand main-border">
            <div class="mb-5">
              <div class="flex">
                <div class="pr-1">
                  <div class="flex items-center mr-4 mt-3">
                    <div @click="onData.misc_options.uucss_variables = !onData.misc_options.uucss_variables" :class="onData.misc_options.uucss_variables? 'bg-purple':''"
                         class="border-purple border-2 rounded p-1 w-5 h-5 transition-all duration-200 cursor-pointer">
                      <svg v-if="onData.misc_options.uucss_variables" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                           class="transform scale-125">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </div>

                  </div>
                </div>
                <div>
                  <h1 @click="onData.misc_options.uucss_variables = !onData.misc_options.uucss_variables" class="font-normal text-base text-black-font cursor-pointer">CSS Variables</h1>
                  <p class="text-sm text-gray-font">Remove unused CSS variables.</p>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <div class="flex">
                <div class="pr-1">
                  <div class="flex items-center mr-4 mt-3">
                    <div @click="onData.misc_options.uucss_keyframes = !onData.misc_options.uucss_keyframes" :class="onData.misc_options.uucss_keyframes? 'bg-purple':''"
                         class="border-purple border-2 rounded p-1 w-5 h-5 transition-all duration-200 cursor-pointer">
                      <svg v-if="onData.misc_options.uucss_keyframes" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                           class="transform scale-125">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </div>

                  </div>
                </div>
                <div>
                  <h1 @click="onData.misc_options.uucss_keyframes = !onData.misc_options.uucss_keyframes" class="font-normal text-base text-black-font cursor-pointer"> CSS Animation keyframes</h1>
                  <p class="text-sm text-gray-font">Remove unused keyframe animations.</p>
                </div>
              </div>
            </div>


            <div class="mb-5">
              <div class="flex">
                <div class="pr-1">
                  <div class="flex items-center mr-4 mt-3">
                    <div @click="onData.misc_options.uucss_fontface = !onData.misc_options.uucss_fontface" :class="onData.misc_options.uucss_fontface? 'bg-purple':''"
                         class="border-purple border-2 rounded p-1 w-5 h-5 transition-all duration-200 cursor-pointer">
                      <svg v-if="onData.misc_options.uucss_fontface" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                           class="transform scale-125">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </div>

                  </div>
                </div>
                <div>
                  <h1 @click="onData.misc_options.uucss_fontface = !onData.misc_options.uucss_fontface" class="font-normal text-base text-black-font cursor-pointer">CSS @font-face rules</h1>
                  <p class="text-sm text-gray-font">Remove unused @font-face rules.</p>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <div class="flex">
                <div class="pr-1">
                  <div class="flex items-center mr-4 mt-3">
                    <div @click="onData.misc_options.uucss_include_inline_css = !onData.misc_options.uucss_include_inline_css"
                         :class="onData.misc_options.uucss_include_inline_css? 'bg-purple':''"
                         class="border-purple border-2 rounded p-1 w-5 h-5 transition-all duration-200 cursor-pointer">
                      <svg v-if="onData.misc_options.uucss_include_inline_css" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="white" class="transform scale-125">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </div>

                  </div>
                </div>
                <div>
                  <h1 @click="onData.misc_options.uucss_include_inline_css = !onData.misc_options.uucss_include_inline_css" class="font-normal text-base text-black-font cursor-pointer">Inline CSS</h1>
                  <p class="text-sm text-gray-font">Optimize inline CSS.</p>
                </div>
              </div>
            </div>

            <div class="mb-5">
              <div class="flex">
                <div class="pr-1">
                  <div class="flex items-center mr-4 mt-3">
                    <div @click="onData.misc_options.uucss_cache_busting_v2 = !onData.misc_options.uucss_cache_busting_v2"
                         :class="onData.misc_options.uucss_cache_busting_v2? 'bg-purple':''"
                         class="border-purple border-2 rounded p-1 w-5 h-5 transition-all duration-200 cursor-pointer">
                      <svg v-if="onData.misc_options.uucss_cache_busting_v2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                           fill="white" class="transform scale-125">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </div>

                  </div>
                </div>
                <div>
                  <h1 @click="onData.misc_options.uucss_cache_busting_v2 = !onData.misc_options.uucss_cache_busting_v2" class="font-normal text-base text-black-font cursor-pointer">Cache Busting</h1>
                  <p class="text-sm text-gray-font">Enable RapidLoad crawler to view pages with a random query string.</p>
                </div>
              </div>
            </div>
          </div>



          <button @click="saveSettings" :disabled="loading" :class="saved? 'pointer-events-none': ''"
                  class="disabled:opacity-50 flex mb-3 cursor-pointer transition duration-300 bg-purple font-semibold text-white py-2 px-4 border border-purple hover:border-transparent mt-5 rounded-lg">
            <svg :class="loading? 'block' : 'hidden-important'" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg :class="saved ? 'block' : 'hidden-important'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"
                 class="transform scale-125 w-5 h-3.5 mt-1 mr-3 -ml-1">
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </svg>

            Save Settings
          </button>
        </div>
      </div>
      <div class="pb-6">
      </div>
    </div>
    <popup v-if="popupVisible" ref="popup" @dontsave="handleDontSave" @confirm="handleConfirm" @cancel="handleCancel"></popup>

  </main>

</template>

<script>
import config from "../../../config";
import Vue3TagsInput from 'vue3-tags-input';
import dropDown from '../../../components/dropDown.vue';
import messageBox from "../../../components/messageBox.vue";
import axios from "axios";
import popup from "../../../components/popup.vue";
import { directive } from "vue3-click-away";


export default {
  name: "remove-unused-css",

  components: {
    Vue3TagsInput,
    dropDown,
    messageBox,
    popup,
  },
  directives: {
    ClickAway: directive
  },
  mounted() {
    const activeModules = [];
    Object.keys(window.uucss_global.active_modules).forEach((a) => {
      activeModules.push(window.uucss_global.active_modules[a])
    });
    this.remove_css_config = activeModules;

    if (this.remove_css_config) {
      Object.keys(this.remove_css_config).map((key) => {
        if (this.id === this.remove_css_config[key].id) {
          const option = this.remove_css_config[key].options;
          const safelist = option.unused_css.options.uucss_safelist;
          if (safelist) {
            this.safelist = JSON.parse(safelist).map((i) => {
              return i.rule
            }).join("\r\n");
          }
          const blocklist = option.unused_css.options.uucss_blocklist;
          if (blocklist) {
            this.blocklist = JSON.parse(blocklist).map((i) => {
              return i
            }).join("\r\n");
          }
          this.onData.misc_options.uucss_variables = option.unused_css.options.uucss_variables;
          this.onData.misc_options.uucss_keyframes = option.unused_css.options.uucss_keyframes;
          this.onData.misc_options.uucss_fontface = option.unused_css.options.uucss_fontface;
          this.onData.misc_options.uucss_include_inline_css = option.unused_css.options.uucss_include_inline_css;
          this.onData.misc_options.uucss_cache_busting_v2 = option.unused_css.options.uucss_cache_busting_v2;
          this.onData.uucss_safelist = this.safelist;
          this.onData.uucss_blocklist = this.blocklist;
          this.onData.whitelist_packs = option.unused_css.options.whitelist_packs;
          this.onData.suggested_whitelist_packs = option.unused_css.options.suggested_whitelist_packs.map(function(packs){
            return packs.id +":"+ packs.name;
          })
        }
      });
      this.beforeSave = this.onData;
      this.originalData = JSON.parse(JSON.stringify(this.beforeSave));
    }


  },
  computed: {
    whitelist_render(){
     // return this.whitelist_packs = ['Elementor','pluginone']
      return this.onData.whitelist_packs.map(function (wp) {
        console.log("i am here", wp)
        let item = wp.split(':')
        return item[1];
      })

    },


    filteredList() {
      // console.log(this.onData.whitelist_packs);
      // console.log(this.onData.suggested_whitelist_packs);
      // const suggested_whitelist_packs = this.removeDuplicates(this.onData.whitelist_packs, this.onData.suggested_whitelist_packs)
      // console.log(suggested_whitelist_packs);
      const text = this.filterText.toLowerCase().trim();
      if (!text) {
        return this.onData.suggested_whitelist_packs.map(function (wp) {
          let item = wp.split(':');
          return item[1];
        });
      } else {
        return this.onData.suggested_whitelist_packs.flatMap(function (wp) {
          let item = wp.split(':');
          let words = item[1].split(',').map(word => word.trim());
          return words.filter(word => word.toLowerCase().includes(text));
        });
      }
    }


  },
  methods: {


    handleConfirm() {
      this.saveSettings();
      this.handleDontSave();
    },

    handleDontSave(){
      this.confirmStatus = true;
      this.popupVisible= false;
      const back = document.getElementById('rp-back');
      back.click();
    },
    handleCancel() {
      this.popupVisible= false;
    },

    loadWhitelistPacks() {
      this.refresh_element = true;
     // this.focus='tag';

      axios.post(window.uucss_global.ajax_url + '?action=suggest_whitelist_packs&nonce='+window.uucss_global.nonce)
          .then(response => {

             if(response.data?.data){
               const newWhitelist = response.data?.data?.map((value) => {
                 return value.id + ':' + value.name;
               })
               const uniqueWhitelist = newWhitelist.map(function (wp) {

                 let item = wp.split(':')
                 console.log('New Whitelist: ', item[1]);
                 return item[1];

               })
               if(this.onData.suggested_whitelist_packs.length > 0){
                 const uniqueSuggetested = this.onData.suggested_whitelist_packs.map(function (wp) {
                   let item = wp.split(':')
                   return item[1];
                 })

                 const uniqueItems = uniqueWhitelist.filter(item => !uniqueSuggetested.includes(item));

                 if(uniqueItems.length > 0){
                   const foundItem = newWhitelist.find(item => item.includes(uniqueItems));
                   console.log("Found Item: "+ foundItem);
                   this.onData.whitelist_packs.push(foundItem);

                   this.onData.suggested_whitelist_packs = newWhitelist;
                 }
               }else if(this.onData.suggested_whitelist_packs.length === 0){
                 const pushWhiteList = newWhitelist.map((item)=>{return item});
                 this.onData.whitelist_packs = pushWhiteList;
               }

               const uniqueWhitelistPacks = this.onData.whitelist_packs.filter((item, index, arr) => {

                 const textAfterColon = item.split(":")[1];
                 return index === arr.findIndex((i) => i.split(":")[1] === textAfterColon);
               });

               this.onData.whitelist_packs = uniqueWhitelistPacks;


            }else if(response.data?.data?.errors[0]?.detail){
              this.errorMessage = response.data?.data?.errors[0].detail;
            }
            this.refresh_element = false;
           // this.focus=null;
          })
          .catch(error => {
            this.errorMessage = error.message;
            this.refresh_element = false;
         //   this.focus=null;

          });

    },

    selectPacks(selected) {
      const text = selected.toLowerCase().trim();
      const foundItem = this.onData.suggested_whitelist_packs.find(function (wp) {
        const item = wp.split(':');
        return item[1].toLowerCase() === text;
      });

      if (foundItem) {
        const item = foundItem.split(':');
        const newItem = item[0] + ':' + item[1];

        // Check if the newItem already exists in whitelist_packs
        if (!this.onData.whitelist_packs.includes(newItem)) {
          this.onData.whitelist_packs.push(newItem);
        }
      }
    },



    clickOutside() {
      this.focus = '';
    },
    handleChangeTag(tags) {
      if(tags){
        this.onData.whitelist_packs = this.onData.whitelist_packs.filter((v)=>{ var elements = v.split(":");
                         if(tags.includes(elements[1])){ return true; } return false; })

      }

    },

    dataSaved(){
      this.saved = true;
      setTimeout(() => this.saved = false, 2000)
    },

    saveSettings() {
      this.loading = true;

      const data = {
        uucss_enable_uucss: true,
        uucss_cache_busting_v2: this.onData.misc_options.uucss_cache_busting_v2,
        uucss_fontface: this.onData.misc_options.uucss_fontface,
        uucss_include_inline_css: this.onData.misc_options.uucss_include_inline_css,
        uucss_keyframes: this.onData.misc_options.uucss_keyframes,
        uucss_variables: this.onData.misc_options.uucss_variables,
        uucss_safelist: this.onData.uucss_safelist,
        uucss_blocklist: this.onData.uucss_blocklist,
        whitelist_packs: this.onData.whitelist_packs,

      }



      axios.post(window.uucss_global.ajax_url + '?action=update_rapidload_settings&nonce='+window.uucss_global.nonce, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            response.data
            window.uucss_global.active_modules = response.data.data;
          })
          .catch(error => {
            this.errorMessage = error.message;

          }).finally(() => {
              this.loading = false;
              this.dataSaved();
          });
      this.originalData = JSON.parse(JSON.stringify(data));
      this.beforeSave = JSON.parse(JSON.stringify(data));
    },

  },
  beforeRouteLeave(to, from, next) {
    this.onData.misc_options.default = false;
    if(JSON.stringify(this.originalData) !== JSON.stringify(this.beforeSave) && !this.confirmStatus){
      this.popupVisible = true;
      this.confirmStatus = false;
    }
    if(this.popupVisible){
      next(false);
    }else{
      next();
    }
  },
  data() {
    return {
      base: config.is_plugin ? config.public_base + 'images/' : 'public/images/',
      loading: false,
      saved: false,
      remove_css_config: [],
      id: 'css',
      focus: null,
      refresh_element: false,
      back: '/css',

      onData: {
        misc_options: {
          default: false,
          uucss_variables: false,
          uucss_keyframes: false,
          uucss_fontface: false,
          uucss_include_inline_css: false,
          uucss_cache_busting_v2: false,
        },
        suggested_whitelist_packs: [],
        inline_small_css: false,
        uucss_safelist: '',
        uucss_blocklist: '',
        whitelist_packs: [],

      },
      filterText: '',
      beforeSave:{},
      originalData: {},
      popupVisible: false,
      confirmStatus: false,

    }
  },


}
</script>

<style scoped>

</style>