<template>
    <div>
        <el-row class='puechaseBuynew'>
            <el-col class='produce-content-right'>
                <el-card :body-style="{ padding: '0px' }" class='el-card-body'>
                    <div style="padding: 14px;height:322px;">
                        <img src="@/assets/images/rexiao@3x.png" class='icontitle' alt="">
                        <h3 class='el-card-title'>金财核算代账个人版</h3>
                        <ol class='el-card-content'>
                            <li>适合代账个人用</li>
                            <li>没有组织权限管理</li>
                            <li>功能范围:总账、报表、资产</li>
                            <li>10-99个账套</li>
                        </ol>
                        <el-button type="primary" class='el-card-button' @click='nextpage(1)'>立即购买</el-button>

                    </div>
                </el-card>
            </el-col>
            <el-col class='produce-content-right'>
                <el-card :body-style="{ padding: '0px' }" class='el-card-body'>
                    <div style="padding: 14px;">
                        <img src="@/assets/images/rexiao@3x.png" class='icontitle' alt="">
                        <h3 class='el-card-title'>金财核算代账机构版</h3>
                        <ol class='el-card-content'>
                            <li>适合代账公司用</li>
                            <li>有组织权限管理</li>
                            <li>功能范围:总账、报表、资产、存货、客户、合同、收费、任务等功能</li>
                            <li>100个账套起购</li>
                        </ol>

                        <el-button type="primary" class='el-card-button' @click='nextpage(2)'>立即购买</el-button>

                    </div>
                </el-card>
            </el-col>
            <el-col>
                <el-card :body-style="{ padding: '0px' }" class='el-card-body'>
                    <div style="padding: 14px;">
                        <img src="@/assets/images/rexiao@3x.png" class='icontitle' alt="">
                        <h3 class='el-card-title'>金财核算企业版</h3>
                        <ol class='el-card-content'>
                            <li>适合企业自用</li>
                            <li>功能范围：包括总账、表报、资产、存货核算等功能</li>
                            <li>功能范围:总账、报表、资产</li>
                            <li>10个账套</li>
                        </ol>
                        <el-button type="primary" class='el-card-button' @click='nextpage(3)'>立即购买</el-button>

                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },
  created() {},
  methods: {
    nextpage(num) {
      let data = ["order", num];
      this.$emit("nextpage", data);
    }
    //  ,
    //  getinfo(){
    //     //  console.log(this.$request)
    //     //  let Content = {
    //     //     //  offset:1,
    //     //     //  limitl:4
    //     //  }

    //     //    this.$store.dispatch('GetArchivesMenu',Content).then(res=>{
    //     //      console.log(12312312)
    //     //      console.log(res)
    //     //  })
    //     // this.$request.post('/business/management/CountData',Content).then(res=>{
    //     //     console.log(res)
    //     // })
    //  }
  }
};
</script>

<style scoped lang='less'>
.el-card-title {
  font-size: 18px;
  color: #606266;
  letter-spacing: 0;
  text-align: center;
}
.icontitle {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 57px;
}
.el-card-content {
  line-height: 24px;
  font-size: 14px;
  color: #606266;
}
.el-card-content li {
  font-size: 12px;
  color: #606266;
  letter-spacing: 0;
  line-height: 24px;
}
.el-card-button {
  display: block;
  margin: 0 auto;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -15%;
}
.produce-content-right {
  margin-right: 20px;
}
.el-card-content-righttop {
  transform: rotate(45deg);
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
}
.el-card-body {
  margin-top: 50px;
  height: 350px;
  width: 100%;
  position: relative;
}
.puechaseBuynew {
  display: flex;
  flex-direction: row;
}
</style>
