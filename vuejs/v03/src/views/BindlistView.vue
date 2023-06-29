<template>
  <div>
    <select name="" id="" v-model="selData">
      <option v-for="city in arr" :key="city" :value="city.name">
        {{ city.name }}
      </option>
    </select>
    <br />
    <span>선택하신 배송지역은 :{{ selData }}</span
    ><br />
    <span v-if="selData == '제주'">☞제주산간지방은 5,000원이 추가됩니다.</span>
    <div id="table">
      <table>
        <tr class="head">
          <th>NO</th>
          <th>카테고리</th>
          <th>제품명</th>
          <th>가격</th>
          <th>배송료</th>
          <th>수량</th>
          <th style="width: 100px">합계</th>
        </tr>
        <tr :key="item" v-for="(item, i) in productlist">
          <td>{{ i + 1 }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.product_name }}</td>
          <td class="iprice"><input v-model.number="item.price" /></td>
          <td>
            {{
              selData === '제주'
                ? item.delivery_price + 5000
                : item.delivery_price
            }}
          </td>
          <td>
            <input
              style="width: 50px; text-align: center"
              type="number"
              min="0"
              v-model="수량[i]"
            />
          </td>
          <td>
            {{
              (total[i] =
                item.price * 수량[i] +
                (수량[i] > 0
                  ? selData === '제주'
                    ? item.delivery_price + 5000
                    : item.delivery_price
                  : 0))
            }}
          </td>
        </tr>
        <tr>
          <td colspan="6">총합</td>
          <td>{{ (sum = total.reduce((a, c) => a + c, 0)) }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: [],
      selData: '',
      수량: [0, 0, 0, 0, 0],
      sum: 0,
      productlist: [
        {
          product_name: '기계식 키보드',
          price: 25000,
          category: '액세서리',
          delivery_price: 5000
        },
        {
          product_name: '무선 마우스',
          price: 12000,
          category: '액세서리',
          delivery_price: 3000
        },
        {
          product_name: '아이패드',
          price: 725000,
          category: '노트북/태블릿',
          delivery_price: 10000
        },
        {
          product_name: '태블릿PC',
          price: 32000,
          category: '노트북/태블릿',
          delivery_price: 5000
        },
        {
          product_name: '무선충전기',
          price: 42000,
          category: '액세서리',
          delivery_price: 4000
        }
      ],
      arr: [
        { name: '서울', code: '02' },
        { name: '제주', code: '064' },
        { name: '창원', code: '055' },
        { name: '대구', code: '053' }
      ]
    }
  }
}
</script>
<style>
table {
  width: 80%;
  height: 100%;
  margin: 10px auto;
  border: 1px solid black;
  border-collapse: collapse;
}
.head {
  background: lightblue;
}
.total {
  background: gold;
}
th,
td {
  border: 1px solid black;
  height: 50px;
}
input {
  border: none;
  width: 40px;
  text-align: center;
}
</style>
