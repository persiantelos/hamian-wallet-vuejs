<script>
import appConfig from "@/app.config";

/**
 * Product detail component
 */
export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
 
  components: { },
  data() {
    return {
      productDetail: null,
      title: "",
      creator: "",
      serial: "",
      itemDate: "",
      dateItem: "", 
      time: "",
      group: "",
      picture: "",
      assets: "",
      setId: "",

    };
  },
  
  mounted(){
    console.log('this.value',this.value)
    this.$store.state.currentPageItems[0].text = 'Item Detail';
    for(let tag of this.value.tags){
      if(tag.tag_name == 'title'){
        this.$store.state.currentPageItems[1].text = tag.content;
        this.title = tag.content
      }
      if(tag.tag_name == 'creator'){
        this.creator = tag.content
      }
      if(tag.tag_name == 'asset'){
        this.assets = tag.content
      }
    }
    this.picture = this.value.url
    console.log('this.value.item2',this.value.item)
    this.serial = this.value.item.serial
    this.group = this.value.item.group
    for(let att of this.value.attributes){
      if(att.attribute_name == 'mintdate'){
        var itemDate = new Date(att.points*1000).toISOString().split('T');
        this.dateItem = itemDate[0]
        this.time = itemDate[1].split('.')[0]
      }
      if(att.attribute_name == 'set'){
        this.setId = att.points
      }
    }

  },
  
  methods: {
    /**
     * Selected image shows
     */
    imageShow(event) {
      const image = event.target.src;
      const expandImg = document.getElementById("expandedImg");
      expandImg.src = image;
    },
  },
};
</script>

<template>
<div>
    <div class="row">
      <div class="col-lg-12">
        <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
          <div class="card-body">
            <div class="row">
              <div class="col-xl-6">
                <div class="product-detai-imgs">
                  <div class="product-img" >
                      <img 
                        loading="lazy"
                        :src="picture"
                        alt
                        class="img-fluid mx-auto d-block"
                      />
                    </div>
                </div>
              </div>

              <div class="col-xl-6">
                <div class="mt-3" >
                  <h4 class="mt-1 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" v-if="title">Title :{{title}}</h4>
                  <p class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" v-if="creator">( Create by : {{creator}} )</p>
                  <h5 v-if="serial" class="mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                    Serial Number :
                    <b>{{serial}}</b>
                  </h5>
                  <p v-if="assets" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Asset :</b> {{assets}}
                  </p>
                  <p v-if="dateItem && time" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Mint Date :</b> {{dateItem + ' ' + time}}
                  </p>
                  <p v-if="group" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Group :</b> {{group}}
                  </p>
                  <p v-if="setId" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Set Id :</b> {{setId}}
                  </p>
                  <div v-if="value.isProtected" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Stored in :</b> <img style="width:45px" src="@/assets/logos/protected.svg"> <b>Xtorage Protected File</b>
                  </div>
                  <div v-if="value.isXtorage" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Stored in :</b> <img style="width:45px" src="@/assets/logos/xtorage.svg"> <b>Xtorage</b>
                  </div>
                  <div v-if="value.isDstore" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                    <b>Stored in :</b> <img style="width:45px" src="@/assets/logos/dstor.svg"> <b>DStor</b>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>
