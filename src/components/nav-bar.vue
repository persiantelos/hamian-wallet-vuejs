<script>
import axios from "axios";
import simplebar from "simplebar-vue";

import i18n from "../i18n";
import Config from '../common/config';
import EventBus from '../localService/eventBus'
import WalletService from '../localService/walletService'
import Dialog from '../components/common/Dialog.vue';
import QRCode from 'qrcode'
import AccountService from '@/services/accountService';
import StorageService from '@/localService/storageService';
import Spinner from "@/components/spinner/Spinner.vue"




/**
 * Nav-bar Component
 */
export default {
  data() {
    return {
      languages: [
        {
          flag: require("@/assets/images/flags/us.jpg"),
          language: "en",
          title: "English",
        },
        {
          flag: require("@/assets/images/flags/french.jpg"),
          language: "fr",
          title: "French",
        },
        {
          flag: require("@/assets/images/flags/spain.jpg"),
          language: "es",
          title: "Spanish",
        },
        {
          flag: require("@/assets/images/flags/chaina.png"),
          language: "zh",
          title: "Chinese",
        },
        {
          flag: require("@/assets/images/flags/arabic.png"),
          language: "ar",
          title: "Arabic",
        },
      ],
      lan: i18n.locale,
      text: null,
      flag: null,
      value: null,
      username:'',
      imageUrl:'@/assets/images/users/1.jpg',
      appMode:false,
      showDialogKeys:false,
      showDialogQrCode:false,
      showSpinner:true,
      showQrCode:false,
      keys:[],
      accountList:[],
      tokensList:[],
      AccountListFinal:[],
      strToQrCode:'',
    };
  },
  components: { simplebar,Spinner,
  Dialog },
    
  mounted() {
    this.getAvatar()
    this.getAccounts()
    this.username=Config.username;
    this.value = this.languages.find((x) => x.language === i18n.locale);
    this.text = this.value.title;
    this.flag = this.value.flag;
    EventBus.addCallBack((data,self)=>{
      console.log('------------------------------KKKK',data)
      if(data.isAvatar)self.imageUrl='http://dp.xtorage.cloud/'+this.username+'/avatar'
    },'account',this);
    // if(this.$store.state.layout.themeDarkMode){
      document.getElementById('appMode').click()
    // }
    // console.log('attribute',document.body.getAttribute("data-topbar"))

  },
  methods: {
    async setSelectedacc(account){
      if(this.$store.state.currentAccount.name != account.name){
          if(this.$store.state.currentNet){
              account.chainId=this.$store.state.currentNet.chainId;
              account.network = this.$store.state.currentNet._id;
              var data =  await StorageService.saveSelectedAccount(account);
              if(data.message){
                  this.$store.state.currentAccount = account
                  this.$store.state.currentAccountChainName = this.$store.state.currentNet._id;
                  this.selected = account.name;
                  this.$store.state.globalReload++
                  this.counter++
                  this.$notify({
                      group: 'foo',
                      type: 'success',
                      text: 'Account Selected'
                  });
              }
              else{
                  this.$notify({
                      group: 'foo',
                      type: 'warn',
                      title: 'Oops!!!',
                      text: 'Something whent wrong!'
                  });
              }
          }
      }
      else{
        this.$notify({
            group: 'foo',
            type: 'info',
            text: 'This account is already selected'
        });
      }
    },
    async getAccounts(){
        var thempAccountList = []
        let accountList = await WalletService.getAccounts();
        for(let acc of accountList){
            if(acc.chainId == this.$store.state.currentNet.chainId)
            {
                thempAccountList.push(acc)
            }
        }
        this.accountList = thempAccountList;
        console.log('this.accountListthis.accountList',this.accountList)
        this.checkValue(this.accountList);
        // this.getCurrentAccount();
    },
    checkValue(newVal){
        if(newVal.length>1){
            this.getTokensList();
        }
    },
    async getTokensList(){
        this.tokensList = await AccountService.getTokensList();
        this.tokensList = this.tokensList.value
        if(this.$store.state.currentNet&&this.tokensList){
            this.filterByCurrentNetName();
        }
    },
    filterByCurrentNetName(){
        let temoTokenList = []
        for(let token of this.tokensList){
            if(token.chain == this.$store.state.currentNet._id){
                temoTokenList.push(token)
            }
        }
        this.tokensList = temoTokenList;
        this.getTokenBalanceByContractName();
    },
    async getTokenBalanceByContractName(){
        var currentNet = this.$store.state.currentNet;
        for(let account of this.accountList){
            account.val = []
            for(var token of this.tokensList){
                let balance = await AccountService.getDynamicTokenBalance(token,account.name,currentNet)
                account.val.push(balance)
            }
        }
        this.showSpinner = false;
        this.AccountListFinal = this.accountList
    },
    async getAvatar(){
      var profileInformation = await AccountService.getSocialProfile(this.$store.state.currentAccount.name);
      if(profileInformation){
        profileInformation.Avatar ? this.$store.state.avatar = profileInformation.Avatar : '';
      }
    },
    themeDarkMode(data){
      this.appMode=data.value
      if(data.value == true){
        document.body.setAttribute("data-topbar", 'dark');
        this.$store.state.layout.themeDarkMode=true;

      }
      else{
        document.body.setAttribute("data-topbar", 'light');
        this.$store.state.layout.themeDarkMode=false;

      }
    },
    
    
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
    initFullScreen() {
      document.body.classList.toggle("fullscreen-enable");
      if (
        !document.fullscreenElement &&
        /* alternative standard method */ !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
      ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(
            Element.ALLOW_KEYBOARD_INPUT
          );
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
    },
    setLanguage(locale, country, flag) {
      this.lan = locale;
      this.text = country;
      this.flag = flag;
      i18n.locale = locale;
    },
    logoutUser() {
      window.localStorage.clear();
      this.$router.push({name:'login'})
      // eslint-disable-next-line no-unused-vars
      // axios.get("http://127.0.0.1:8000/api/logout").then((res) => {
      //   this.$router.push({
      //     name: "default",
      //   });
      // });
    },
    async generateKey(){
    var keys = await WalletService.generateKey();
    if(keys.message == 'success'){
      this.keys = keys;
      this.showDialogKeys = true;
      setTimeout(() => {
        document.getElementById('modalkeys').click()
      }, 100);
    }
    },
    generateQrCode(){
      this.showQrCode=false
      this.strToQrCode=''
      this.showDialogQrCode = true;
      setTimeout(() => {
        document.getElementById('modalQrCode').click()
      }, 100);
    
    },
    convertStrToQrCode(){
      console.log(this.strToQrCode)
      if (this.strToQrCode != '') {
        this.showQrCode=true
        QRCode.toCanvas(document.getElementById('canvas'), this.strToQrCode, function (error) {
            if (error){
              console.error(error)
            } else{
              console.log('success!');
            }
        })
      }
    }
  },
};
</script>

<template>
<div>
  
  <header id="page-topbar">
    <div  v-if="showDialogKeys">
      <button class="d-none" id="modalkeys" v-b-modal.modal-standard></button>
      <b-modal id="modal-standard" title="Generated keys" title-class="font-18">
        <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode' : ''">Copy the keys below</h5>
        <p class="mt-3">Private Key: {{keys.data.private_key}}</p>
        <p class="mt-3">Public Key: {{keys.data.public_key}}</p>
        <template #modal-footer>
          <div dir="rtl" class="w-100 float-right">
            <b-button class="pr-3 m-1 pl-3" 
                variant="outline-secondary"
                size="sm"
                @click="$bvModal.hide('modal-standard')"
                >
                Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <div v-if="showDialogQrCode">
      <button class="d-none" id="modalQrCode" v-b-modal.modal-qrCode></button>
      <b-modal id="modal-qrCode" title="String to qr code" title-class="font-18">
        <h5 :class="$store.state.layout.themeDarkMode ? 'text-dark-mode' : ''">Type what you whant to convert to QR Code</h5>
        <b-form-input
          id="input-3"
          v-model="strToQrCode"
          type="text"
          @keyup.enter="convertStrToQrCode()"
          placeholder="Type something..."
          :class="$store.state.layout.themeDarkMode ? 'input-forms':''"
        ></b-form-input>
        
        <div v-show="showQrCode" class="col-12 center mt-3" align="center">
          <div id="qrcode-container" class="bg-grey-11" style="padding:0px">
            <canvas style="width:160px;height:160px;padding:0px;margin:0px" id="canvas"></canvas>
          </div>
        </div>

        <template #modal-footer>
          <div dir="rtl" class="w-100 float-right">
            <b-button class="pr-3 mt-2 m-1 pl-3" 
                variant="outline-primary"
                size="sm"
                @click="convertStrToQrCode()">
                Convert
            </b-button>
            <b-button class="pr-3 m-1 pl-3" 
                variant="outline-secondary"
                size="sm"
                @click="$bvModal.hide('modal-qrCode')">
                Close
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
    <div class="navbar-header">
      
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link tag="a" to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img src="@/assets/images/logo.svg" alt height="22" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/images/logo-dark.png" alt height="17" />
            </span>
          </router-link>

          <router-link tag="a" to="/" class="logo logo-light">
            <span class="logo-sm">
              <img src="@/assets/picture/hamian.svg" alt height="24" />
            </span>
            <span class="logo-lg">
              <img src="@/assets/picture/hamian.svg" alt height="22" />
              <span  style="color:white">
                HAMIAN
              </span>
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <!-- App Search-->
        <div class="app-search d-none d-lg-block">
          <div class="position-relative my-4">
            
            <router-link style="margin-left:-30px;margin-top:-20px;display:flex" class="d-flex" v-if="$store.state.currentAccount.length != 0" tag="span"  to="#" align="left">
            <b-dropdown style="margin-left:0px;min-width:150px"
              right
              variant="black"
              toggle-class="header-item"
              menu-class="dropdown-menu-end"
            >
            <template  v-slot:button-content>
                  <span style="margin-left:5px;margin-top:-10px;font-size:14px"
                  :style="$store.state.layout.themeDarkMode ? 'color:#a6b0cf' :''">
                  <i  class="bx bx-user font-size-16 " style="margin-left:0px"></i>
                  {{$store.state.currentAccount.name}}
                </span>
            </template>
            <div v-if="!showSpinner">
              <div  v-for="(account , index) in AccountListFinal" :key="index">
                <b-dropdown-item  style="max-height:50px" @click="setSelectedacc(account)" class="d-block" href="#">
                  <p class="font-size-15" :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
                    <i  class="bx bx-user  " :class="$store.state.currentAccount.name == account.name ? 'text-warning' : ''"></i>
                    {{account.name}}
                  </p>
                </b-dropdown-item>
              </div>
            </div>
            <div v-if="showSpinner" style="min-height:50px">
              <Spinner v-model="showSpinner" />
            </div>
            </b-dropdown>
            </router-link>
            <router-link style="margin-left:-5px;margin-top:-10px;display:flex" class="d-flex" v-if="$store.state.currentNet.length != 0" tag="span"  to="#" align="left">
              <span 
              style="margin-top:2px;color:gray;font-size:13px;width:100px">
              {{$store.state.currentNet.name}}
              </span>
            </router-link>
          </div>
        </div>
        <!-- <form class="app-search d-none d-lg-block">
          <div class="position-relative">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('navbar.search.text')"
            />
            <span class="bx bx-search-alt"></span> 
          </div>
        </form> -->

        <!-- <b-dropdown
          variant="black"
          class="dropdown-mega d-none d-lg-block ms-2"
          toggle-class="header-item"
          menu-class="dropdown-megamenu"
        >
          <template v-slot:button-content>
            {{ $t("navbar.dropdown.megamenu.text") }}
            <i class="mdi mdi-chevron-down"></i>
          </template>

          <div class="row">
            <div class="col-sm-8">
              <div class="row">
                <div class="col-md-4">
                  <h5 class="font-size-14 mt-0">
                    {{ $t("navbar.dropdown.megamenu.uicontent.title") }}
                  </h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.lightbox")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.uicontent.list.rangeslider"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.sweetalert")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.rating")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.forms")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.tables")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.charts")
                      }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-md-4">
                  <h5 class="font-size-14 mt-0">
                    {{ $t("navbar.dropdown.megamenu.application.title") }}
                  </h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.application.list.ecommerce"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.application.list.calendar")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.application.list.email")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.application.list.projects")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.application.list.tasks")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.application.list.contacts")
                      }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-md-4">
                  <h5 class="font-size-14 mt-0">
                    {{ $t("navbar.dropdown.megamenu.extrapages.title") }}
                  </h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.extrapages.list.lightsidebar"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.extrapages.list.compactsidebar"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.extrapages.list.horizontallayout"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.extrapages.list.maintenance"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.extrapages.list.comingsoon"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.extrapages.list.timeline")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.extrapages.list.faqs")
                      }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-6">
                  <h5 class="font-size-14 mt-0">
                    {{ $t("navbar.dropdown.megamenu.uicontent.title") }}
                  </h5>
                  <ul class="list-unstyled megamenu-list">
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.lightbox")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t(
                          "navbar.dropdown.megamenu.uicontent.list.rangeslider"
                        )
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.sweetalert")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.rating")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.forms")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.tables")
                      }}</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">{{
                        $t("navbar.dropdown.megamenu.uicontent.list.charts")
                      }}</a>
                    </li>
                  </ul>
                </div>

                <div class="col-sm-5">
                  <div>
                    <img
                      src="@/assets/images/megamenu-img.png"
                      alt
                      class="img-fluid mx-auto d-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-dropdown> -->
      </div>

      <div class="d-flex">
        <!-- <b-dropdown
          class="d-inline-block d-lg-none ms-2"
          variant="black"
          menu-class="dropdown-menu-lg p-0"
          toggle-class="header-item noti-icon"
          right
        >
          <template v-slot:button-content>
            <i class="mdi mdi-magnify"></i>
          </template>

          <form class="p-3">
            <div class="form-group m-0">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search ..."
                  aria-label="Recipient's username"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">
                    <i class="mdi mdi-magnify"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </b-dropdown> -->

        <!-- <b-dropdown variant="white" right toggle-class="header-item">
          <template v-slot:button-content>
            <img class :src="flag" alt="Header Language" height="16" />
            {{ text }}
          </template>
          <b-dropdown-item
            class="notify-item"
            v-for="(entry, i) in languages"
            :key="`Lang${i}`"
            :value="entry"
            @click="setLanguage(entry.language, entry.title, entry.flag)"
            :class="{ active: lan === entry.language }"
          >
            <img
              :src="`${entry.flag}`"
              alt="user-image"
              class="me-1"
              height="12"
            />
            <span class="align-middle">{{ entry.title }}</span>
          </b-dropdown-item>
        </b-dropdown> -->

        <!-- <b-dropdown
          class="d-none d-lg-inline-block noti-icon"
          menu-class="dropdown-menu-lg dropdown-menu-end"
          right
          toggle-class="header-item"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-customize"></i>
          </template>

          <div class="px-lg-2">
            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/github.png" alt="Github" />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img
                    src="@/assets/images/brands/bitbucket.png"
                    alt="bitbucket"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.github") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img
                    src="@/assets/images/brands/dribbble.png"
                    alt="dribbble"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.dribbble") }}</span>
                </a>
              </div>
            </div>

            <div class="row no-gutters">
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/dropbox.png" alt="dropbox" />
                  <span>{{ $t("navbar.dropdown.site.list.dropbox") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img
                    src="@/assets/images/brands/mail_chimp.png"
                    alt="mail_chimp"
                  />
                  <span>{{ $t("navbar.dropdown.site.list.mailchimp") }}</span>
                </a>
              </div>
              <div class="col">
                <a class="dropdown-icon-item" href="javascript: void(0);">
                  <img src="@/assets/images/brands/slack.png" alt="slack" />
                  <span>{{ $t("navbar.dropdown.site.list.slack") }}</span>
                </a>
              </div>
            </div>
          </div>
        </b-dropdown> -->

        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon"
            @click="initFullScreen"
          >
            <i class="bx bx-fullscreen"></i>
          </button>
          <!-- <button
            type="button"
            class="btn header-item noti-icon"
            @click="generateKey()"
          >
            
          generate keys
          </button>
        -->
        </div> 

        <!-- <b-dropdown
          right
          menu-class="dropdown-menu-lg p-0 dropdown-menu-end"
          toggle-class="header-item noti-icon"
          variant="black"
        >
          <template v-slot:button-content>
            <i class="bx bx-bell bx-tada"></i>
            <span class="badge bg-danger rounded-pill">{{
              $t("navbar.dropdown.notification.badge")
            }}</span>
          </template>

          <div class="p-3">
            <div class="row align-items-center">
              <div class="col">
                <h6 class="m-0">
                  {{ $t("navbar.dropdown.notification.text") }}
                </h6>
              </div>
              <div class="col-auto">
                <a href="#" class="small">{{
                  $t("navbar.dropdown.notification.subtext")
                }}</a>
              </div>
            </div>
          </div>
          <simplebar style="max-height: 230px">
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-primary rounded-circle font-size-16"
                  >
                    <i class="bx bx-cart"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.order.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.order.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.order.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-3.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.james.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.james.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.james.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <div class="avatar-xs me-3">
                  <span
                    class="avatar-title bg-success rounded-circle font-size-16"
                  >
                    <i class="bx bx-badge-check"></i>
                  </span>
                </div>
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.item.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.item.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.item.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript: void(0);" class="text-reset notification-item">
              <div class="media">
                <img
                  src="@/assets/images/users/avatar-4.jpg"
                  class="me-3 rounded-circle avatar-xs"
                  alt="user-pic"
                />
                <div class="media-body">
                  <h6 class="mt-0 mb-1">
                    {{ $t("navbar.dropdown.notification.salena.title") }}
                  </h6>
                  <div class="font-size-12 text-muted">
                    <p class="mb-1">
                      {{ $t("navbar.dropdown.notification.salena.text") }}
                    </p>
                    <p class="mb-0">
                      <i class="mdi mdi-clock-outline"></i>
                      {{ $t("navbar.dropdown.notification.salena.time") }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </simplebar>
          <div class="p-2 border-top d-grid">
            <a
              class="btn btn-sm btn-link font-size-14 text-center"
              href="javascript:void(0)"
            >
              <i class="mdi mdi-arrow-right-circle me-1"></i>
              {{ $t("navbar.dropdown.notification.button") }}
            </a>
          </div>
        </b-dropdown> -->

        <b-dropdown
          right
          variant="black"
          toggle-class="header-item"
          menu-class="dropdown-menu-end"
        >
          <template v-slot:button-content>
            <img v-if="$store.state.avatar"
              loading="lazy"
              class="rounded-circle header-profile-user"
              :src="$store.state.avatar"
              alt="A"
            />
            <img v-else
              class="rounded-circle header-profile-user"
              src="@/assets/images/users/1.jpg"
              alt="A"
            />
            <!-- <span class="d-none d-xl-inline-block ms-1">
              {{selectedAccount}}
            </span> -->
            <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
          </template>
          <!-- item-->
          <!-- <b-dropdown-item href="javascript: void(0);">
             <router-link v-if="$store.state.currentNet" tag="span"  to="#" align="left">
              <i class="mdi mdi-network-outline font-size-16 align-middle"></i>
              {{$store.state.currentNet.name}}
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item href="javascript: void(0);">
            <router-link v-if="selectedAccount.length != 0" tag="span"  to="#" align="left">
              <i class="bx bx-user font-size-16 align-middle"></i>
              {{selectedAccount}}
            </router-link>
          </b-dropdown-item> -->
          


          <!-- <b-dropdown-item href="javascript: void(0);">
            <i class="bx bx-wallet font-size-16 align-middle me-1"></i>
            {{ $t("navbar.dropdown.henry.list.mywallet") }}
          </b-dropdown-item>
          -->
          
          <b-dropdown-item @click="generateKey()"  class="d-block" href="#">
            <i class="bx bxs-key font-size-16 align-middle me-1"
            :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"></i>
            <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
              Generate keys
            </span>
          >
          </b-dropdown-item>
          
          <b-dropdown-item @click="generateQrCode()"  class="d-block" href="#">
            <i class="mdi mdi-qrcode font-size-16 align-middle me-1"
            :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"></i>
            <span :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">
              QR Code
            </span>
          >
          </b-dropdown-item>
          <b-dropdown-item>
            <router-link :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''"  to="/contacts/profile">
              <i class="bx bx-user font-size-16 align-middle me-1"></i>
              {{ $t("navbar.dropdown.henry.list.profile") }}
            </router-link>
          </b-dropdown-item>
          <div class="my-3 d-flex justify-content-center">
          <toggle-button id="appMode" v-model="appMode" :labels="true" @change="themeDarkMode"
               />
               <p class="mx-2 " :class="$store.state.layout.themeDarkMode ?'text-dark-mode':''">Dark Mode</p>
          </div>
            <!-- {{ $t("navbar.dropdown.henry.list.lockscreen") }} -->
          <b-dropdown-divider></b-dropdown-divider>
          <a @click="logoutUser" style="cursor:pointer" class="dropdown-item text-danger">
            <i
              class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
            ></i>
            {{ $t("navbar.dropdown.henry.list.logout") }}
          </a>
        </b-dropdown>

        <!-- <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            @click="toggleRightSidebar"
          >
            <i class="bx bx-cog bx-spin toggle-right"></i>
          </button>
        </div> -->
      </div>
    </div>
  </header>
</div>
</template>
