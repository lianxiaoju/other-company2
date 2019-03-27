<template>
    <div class='newpurchase-content' v-loading='loading'>
         <el-tabs v-model="activeName" @tab-click="handleClick" stretch class='newpurchase-title'>
            <el-tab-pane name="1" :disabled='buyshow'>
                 <span slot="label" >
                    <span :class="activeName =='1' ? 'title_number':'title_number title_number2'">
                        <span class='title_number_font'>1</span>
                    </span>
                 选择产品
                 </span>
                 <choseproduce @nextpage="nextpage"></choseproduce>
            </el-tab-pane>
            <el-tab-pane  name="2" :disabled='ordershow'>
                 <span slot="label" >
                    <span :class="activeName =='2' ? 'title_number':'title_number title_number2'">
                        <span class='title_number_font'>2</span>
                    </span>
                 订单信息
                 </span>
                <orderMessage @nextpage="nextpage" @changeActive='changeActive' :choseproduce='choseproduce' ref='cl' :orderinfo='orderinfo' ></orderMessage>
            </el-tab-pane>
            <el-tab-pane label="在线支付" name="3" :disabled='payshow'>
                 <span slot="label" >
                    <span :class="activeName =='3' ? 'title_number':'title_number title_number2'">
                        <span class='title_number_font'>3</span>
                    </span>
                 在线支付
                 </span>
                 <onlinePayment  @nextpage="nextpage"  @orderinfolnull='orderinfolnull' ref='success' :orderinfol='orderinfol'></onlinePayment>
            </el-tab-pane>
            <el-tab-pane label="支付完成" name="4"  :disabled='successshow'>
                 <span slot="label" >
                    <span :class="activeName =='4' ? 'title_number':'title_number title_number2'">
                        <span class='title_number_font'>4</span>
                    </span>
                 支付完成
                 </span>
                 <paysuccess ></paysuccess>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import choseproduce from '@/components/PurchaseBuy/base/choseproduce'
    import orderMessage from '@/components/PurchaseBuy/base/orderMessage'
    import onlinePayment from '@/components/PurchaseBuy/base/onlinePayment'
    import paysuccess from '@/components/PurchaseBuy/base/paysuccess'
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        props: ['OrderType','iszhifubao','info','orderSearchDate'],
        components: {
            choseproduce,
            onlinePayment,
            orderMessage,
            paysuccess
          },
         data() {
             return {
                 activeName:'1',
                 ordershow:true,
                 payshow:true,
                 successshow:true,
                 buyshow:true,
                 choseproduce:null,
                 orderinfol:null,
                 orderinfo:[],
                 loading:false
            };
        },
        computed: {
            ...mapGetters([
                'changeType'
            ]),
            },
        watch:{
         orderSearchDate(){
               this.loading =true

               let obj= this.orderSearchDate
               if(this.changeType ==1){
                     this.$refs.cl.changedOrder()
                }
                 this.orderinfo=obj
                 this.choseproduce=obj[0].ProductVersion
                 this.$emit('getproduceinfo',obj)
                 this.loading =false
         },
          activeName(){

              if(this.activeName =='2' && this.OrderType !=0){
                //   this.orderinfo=[]
                //   this.orderinfo=this.info
                //   if(this.changeType==1){
                //       this.OrderSearch()
                //     // this.$refs.cl.changedOrder()

                //   }else if(this.changeType==0){
                //     this.unPaidOrderOnly()
                //     this.OrderSearch()
                //   }

            if(this.orderSearchDate.length>0){
               let obj= this.orderSearchDate
               this.orderinfo=obj
               this.choseproduce=obj[0].ProductVersion
               this.$emit('getproduceinfo',obj)
               if(this.changeType ==1){
                     this.$refs.cl.changedOrder()
                }

            }
              }else if(this.activeName =='2' && this.OrderType ==0){
                  this.buyshow =false

              }else if(this.activeName =='1'){
                  this.ordershow =true
              }else if (this.activeName =='4'){
                  this.ordershow =true
                  this.buyshow =true
                  this.payshow =true

              }else if(this.activeName =='3'){
                  this.ordershow =true
                  this.buyshow =true
                  this.successshow=true
              }
          }
        },
        created () {

              if(this.OrderType !=0){
                  this.activeName ='2'
                  this.ordershow =false
              }else{
                  this.activeName ='1'
              }
              let  data =this.$route.params
              if('modification' in data){
                  if(this.$route.params.modification){
                      this.$store.commit('SET_CHANGETYPE',1)
                      this.activeName ='2'
                  }
              }else{
                  this.$store.commit('SET_CHANGETYPE',0)
              }
               if('content' in data){
                    if(this.$route.params.content.id){
                    this.activeName ='3'
                    }
               }

        },

        mounted () {
        //    this.orderinfo=this.info
        },
        methods: {
          handleClick(tab, event) {
          },
          changeActive(val){
              if(val ==1){
                  this.buyshow =true
              }
          },
          orderinfolnull(){
              this.orderinfol ={};
          },
          //判断
          nextpage(val){
            //   this.activeName =String(Number(this.activeName)+1)
              if(val[0] =='order'){
                  this.ordershow =false
                  this.choseproduce=val[1]
                  this.activeName='2'
              }else if(val[0] =='pay'){
                  this.payshow =false
                  this.activeName='3'
                  this.orderinfol=val[1]
                //   this.$refs.success.getorderinfo()
              }else if(val[0] =='success'){
                  this.successshow =false
                  this.activeName='4'
              }else if(val[0] =='change'){
                  this.activeName='2'
                  this.ordershow =false
                //   this.choseproduce=val[1]
                this.$emit('OrderSearch')
                //   this.$refs.cl.changedOrder()
              }
          },
        //   searchmethod(){
        //       alert(1)
        //        console.log(this.orderSearchDate)
        //        let obj= this.orderSearchDate
        //        if(this.changeType ==1){
        //              this.$refs.cl.changedOrder()
        //         }
        //          this.orderinfo=obj
        //          this.choseproduce=obj[0].ProductVersion
        //          this.$emit('getproduceinfo',obj)
        //   },
          //增购、和续费的之前的订单查询
             OrderSearch(){
                    let Content={

                    }
                    this.$request.post('/business/order/lastOrder.zm',Content)
                    .then(res=>{
                        if(this.changeType ==1){
                            this.$refs.cl.changedOrder()
                        }
                        let obj=res.Ret
                        this.orderinfo=res.Ret
                        this.choseproduce=res.Ret[0].ProductVersion
                        this.$emit('getproduceinfo',res.Ret)
                    }).catch(error =>{

                    })
                },
        //判断用户是否有未支付订单
        unPaidOrderOnly(){
            let Content ={

            }
            this.$request.post('/business/order/unPaidOrderOnly.zm',Content)
            .then(res =>{
                if(res.Status ==1){
                    let msg =res.Msg+'，请前往支付'
                    this.$confirm(msg,'提示',{
                        confirmButtonText: '确定',
                        center: true,
                        showClose:false,
                        showCancelButton:false,
                        closeOnClickModal:false,
                        closeOnPressEscape:false,
                    }).then(()=>{
                       this.$router.push({path: '/orderForm'});
                    }).catch(()=>{

                    })
                }
            }).catch(error =>{

            })
        },

        //   判断当前ordertype
        //   showtabpan(){
        //       console.log(this.OrderType)
        //       if(this.OrderType !=0){
        //           console.log(444)
        //           this.activeName ='2'
        //           this.ordershow =false
        //           console.log( this.activeName)
        //       }else{
        //           this.activeName ='1'
        //       }
        //   }
        }
    }
</script>

<style scoped  lang="less">
   .newpurchase-content{
       width: 850px;
       margin: 0 auto;
    //    height: 860px;
       height: 100%;
       .newpurchase-title{
          height: 100%;
       }
       .title_number{
           border-radius: 50%;
           height: 20px;
           width: 20px;
           display: inline-block;
           background: #238ff9;
           vertical-align: center;
           .title_number_font{
            display: block;
            color: #FFFFFF;
            height: 20px;
            line-height: 20px;
            text-align: center
           }
       }
       .title_number2{
           background: #D2D6DC;
       }
   }

</style>
