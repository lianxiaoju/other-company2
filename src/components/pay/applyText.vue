<template>
  <div>
    <el-tabs type="border-card" v-model="typeName" @tab-click='selecttype'>
      <el-tab-pane label="新购" name='newbuy' :disabled='isshownewbuy'>
        <newPurchase class='title-top' ref='new1' v-if="this.typeName =='newbuy'" :OrderType='OrderType'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="增购" name='additional'>
        <newPurchase class='title-top' @getproduceinfo='getproduceinfo' ref='new1' v-if="this.typeName =='additional'" :OrderType='OrderType'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="续费" name='renewal'>
        <newPurchase class='title-top' @getproduceinfo='getproduceinfo' ref='new1' v-if="this.typeName =='renewal'" :OrderType='OrderType'></newPurchase>
      </el-tab-pane>
      <el-tab-pane label="升级" name='upgrade'>
        <newPurchase class='title-top' ref='new1' v-if="this.typeName =='upgrade'" :OrderType='OrderType'></newPurchase>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import newPurchase from '@/components/PurchaseBuy/newPurchase'
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    components: {
      newPurchase
    },
    data(){
      return{
        typeName:'newbuy',
        ishasproduct:null,
        isshownewbuy:false,
        produceinfo:null,
      }
    },
    created () {
      this.firstBuySelect();
      let data =this.$route.query;
      // data.content.OrderType =2
      console.log('content' in data)
      if('content' in data){
        if(data.content.OrderType ==0){
          this.typeName = 'newbuy'
        }
        if(data.content.OrderType ==1){
          this.typeName = 'additional'
        }
        if(data.content.OrderType ==2){
          this.typeName = 'renewal'
        }
        if(data.content.OrderType ==3){
          this.typeName = 'upgrade'
        }
      }
    },
    computed: {
       ...mapGetters([
        'OrderType'
      ]),
    },
    watch:{
      ishasproduct(){
        if(this.ishasproduct ==true){
            this.isshownewbuy =true,
            this.typeName='additional'
        }
      },
      typeName(){
        if(this.typeName == 'newbuy'){
          this.$store.commit('SET_ORDERTYPE',0)
          console.log(this.OrderType)
        }if(this.typeName == 'additional'){
          this.$store.commit('SET_ORDERTYPE',1)
          console.log(this.OrderType)
        }if(this.typeName == 'renewal'){
          this.$store.commit('SET_ORDERTYPE',2)
          console.log(this.OrderType)
        }if(this.typeName == 'upgrade'){
          this.$store.commit('SET_ORDERTYPE',3)
          console.log(this.OrderType)
        }
      }
    },
    methods: {
       ...mapMutations({
        SET_ORDERTYPE:'SET_ORDERTYPE',       
      }),
      selecttype(){
        // this.$refs.new1.showtabpan()
      },
      //判断用户是否第一次购买
      firstBuySelect(){
        let Content={

        }
        this.$request.post('/business/order/isFirstPurchase.zm',Content)
        .then(res=>{
          console.log(res)
          if(res.Status ==0){
            this.ishasproduct=res.result
            if(res.productVersion ==2){
              this.$msg('error',res.Msg)
            }
            console.log(this.ishasproduct)
          }
        }).catch(error =>{

        })
      },
      //子传父的方法
      getproduceinfo(val){
        console.log(val)
        this.produceinfo=val
        console.log(this.produceinfo)
        console.log(4444444444)
      }
    }
  }

</script>

<style scoped>
  .el-tabs--border-card {
    border: 0;
  }

  .border-card {
    border: 0;
  }

  .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
    color: #409EFF;
    background-color: #fff;
    border: 1px solid #dcdfe6 !important;
  }
  .newpurchase-title{
    font-size:12px;
    line-height: 17px;
    color:#606266;
  }
  .title-ritht{
    margin-right:10px;
  }
  .title-top{
    /* margin-top: 15px */
  }
  /* .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    line-height: 35px;
    padding: 0 20px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #dcdfe6;
} */

</style>
