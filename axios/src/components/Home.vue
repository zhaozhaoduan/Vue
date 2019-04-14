<template>
    <div>
        <el-container>
            <el-header>
              <p>{{msg}}</p>
              
            </el-header>
            <el-container>
                <el-aside width="200px">
                  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                  </el-radio-group>
                  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                      </template>
                      <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                      </el-menu-item-group>
                      <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                      </el-menu-item-group>
                      <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                      </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                      <i class="el-icon-menu"></i>
                      <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                      <i class="el-icon-document"></i>
                      <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <i class="el-icon-setting"></i>
                      <span slot="title">导航四</span>
                    </el-menu-item>
                  </el-menu>
                </el-aside>
                <el-main>
                    <el-row>
                      <i class="el-icon-edit"></i>
                      <i class="el-icon-share"></i>
                      <i class="el-icon-delete"></i>
                      <el-button type="primary">主要按钮</el-button>
                      <el-button type="success">成功按钮</el-button>
                      <el-button type="primary" plain>主要按钮</el-button>
                      <el-button type="success" plain>成功按钮</el-button>
                      <el-button type="primary" round>主要按钮</el-button>
                    </el-row>
                    <p style="line-height: 12px">栅格化</p>
                    <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
                    </el-row>
                    <p>响应式布局，类似bootstrap</p>
                    <el-row :gutter="10">
                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
                        <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
                    </el-row>
                </el-main>
            
            </el-container>
            
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'home',
    props: {
        msg: String
    },
    data() {
      return{
        isCollapse: true
      }
    }
}
</script>

<style lang='less' scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>


