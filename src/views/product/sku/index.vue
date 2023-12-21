<template>
  <div>
    <el-card>
      <el-table border style="margin: 10px 0" :data="list">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="名称"
          show-overflow-tooltip
          prop="skuName"
          width="300px"
        ></el-table-column>
        <el-table-column
          label="描述"
          prop="skuDesc"
          show-overflow-tooltip
          width="300px"
        ></el-table-column>
        <el-table-column label="图片" width="150px">
          <template v-slot="slot">
            <img
              :src="slot.row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="重量"
          width="150px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="150px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              :icon="scope.row.isSale === 1 ? 'Bottom' : 'Top'"
              :title="scope.row.isSale === 1 ? '下架' : '上架'"
              @click="updateStatus(scope.row)"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="showMsg"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="InfoFilled"
              @click="showDrawer(scope.row)"
            ></el-button>
            <el-popconfirm
              title="确定删除吗?"
              width="300px"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  title="删除SKU"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes, total"
        @size-change="getList(1)"
        @current-change="getList"
      />
    </el-card>

    <el-drawer v-model="drawer">
      <template #header>
        <h4>商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel
              :interval="4000"
              type="card"
              height="200px"
              indicator-position="none"
            >
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="Sku">
import { ref, onMounted } from 'vue'
import {
  reqGetSkuList,
  reqUnSale,
  reqOnSale,
  reqGetSkuInfo,
  reqRemoveSku
} from '@/api/product/sku'
import type { SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(0)
let list = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>({})
const getList = async (peger = 1) => {
  pageNo.value = peger
  const res = await reqGetSkuList(pageNo.value, pageSize.value)
  console.log(res, '列表请求的结果')
  if (res.code === 200) {
    const data = res.data
    total.value = data.total
    list.value = data.records
  }
}
const updateStatus = async ({ id, isSale }: any) => {
  let res = null
  if (isSale === 1) {
    res = await reqUnSale(id)
  } else {
    res = await reqOnSale(id)
  }
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: `${isSale === 1 ? '下架成功' : '上架成功'}`
    })
    getList()
  } else {
    ElMessage({
      type: 'error',
      message: `${isSale === 1 ? '下架失败' : '上架失败'}`
    })
  }
}
const showMsg = () => {
  ElMessage({
    type: 'info',
    message: `正在研发`
  })
}
const showDrawer = async ({ id }: any) => {
  drawer.value = true
  const res = await reqGetSkuInfo(id)
  console.log(res, '获取得的商鑫享清福')
  skuInfo.value = res.data
}
const handleDelete = async ({ id }: any) => {
  const res = await reqRemoveSku(id)

  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: `删除成功`
    })
    getList(list.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: `删除失败`
    })
  }
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
