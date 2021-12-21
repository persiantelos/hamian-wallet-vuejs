<template>
    <div>
        <div v-if="spinner">
            <Spinner v-model="spinner" />
        </div>
        <div>
            <div v-if="emptyList">
                Incoming offers list is empty
            </div>
             <div v-if="!spinner" class="row">
                <div class="col-lg-12">
                    <div class="card" :class="$store.state.layout.themeDarkMode ? 'dark-mode':''">
                    <div class="card-body">
                        <div class="row">
                        <div class="col-xl-6">
                            <div class="product-detai-imgs">
                            <b-tabs
                                pills
                                vertical
                                nav-wrapper-class="col-md-2 col-sm-3 col-4"
                            >
                                <b-tab >
                                <template v-slot:title >
                                    <img
                                    :src="picture"
                                    alt
                                    class="img-fluid mx-auto d-block tab-img rounded"
                                    />
                                </template>
                                <div class="product-img" >
                                    <img 
                                    loading="lazy"
                                    :src="picture"
                                    alt
                                    class="img-fluid mx-auto d-block"
                                    />
                                </div>
                                </b-tab>
                                
                            </b-tabs>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="mt-3" >
                            
                            <h4 class="mt-1 mb-3" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''" v-if="title">Title : {{title}}</h4>
                            <p class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''" v-if="creator">( Create by : {{creator}} )</p>

                            <h5 v-if="serial" class="mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode':''">
                                Serial Number :
                                <b>{{serial}}</b>
                            </h5>
                            <p v-if="picture" class="text-muted mb-4" :class="$store.state.layout.themeDarkMode ? 'text-dark-mode-lighter':''">
                                <b>Asset :</b> {{picture}}
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
<script lang="ts">
import {Vue , Component , Prop} from 'vue-property-decorator'
import Spinner from "@/components/spinner/Spinner.vue"
@Component({components:{Spinner}})
export default class BookmarkItemDetails extends Vue{
    @Prop({default:()=>{return []}}) value:any;
    title:string='';
    creator:string='';
    picture:string='';
    serial:string='';
    group:string='';
    time:string='';
    dateItem:string='';
    setId:string='';
    emptyList:boolean=false;
    mounted(){
        if(this.value){
            this.$store.state.currentPageItems[0].text = 'Bookmark Item Detail';
            this.serial = this.value.serial
            this.group = this.value.group
            for(let tag of this.value.tags){
                if(tag.tag_name == 'title'){
                    this.$store.state.currentPageItems[1].text = tag.content;
                    this.title = tag.content
                }
                if(tag.tag_name == 'creator'){
                    this.creator = tag.content
                }
                if(tag.tag_name == 'asset'){
                    this.picture = tag.content
                }
            }
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
        }
        else{
            this.emptyList = true
        }
    }
}
</script>