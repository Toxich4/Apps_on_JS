
<template>
  <v-data-table
    :headers="headers"
    :items="HOTELS"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.ID }}</td>
      <td class="text-xs-left">{{ props.item.COUNT_STARS }}</td>
      <td class="text-xs-left">{{ props.item.BAR }}</td>
      <td class="text-xs-left">{{ props.item.POOL }}</td>
      <td class="text-xs-right">{{ props.item.WIFI }}</td>
      <td class="justify-center layout px-0">
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'

  export default {
    data () {
      return {
        headers: [
          
          { text: 'ID', value: 'ID' },
          { text: 'Звезды', value: 'COUNT_STARS' },
          { text: 'Бар', value: 'BAR' },
          { text: 'Бассейн', value: 'POOL' },
          { text: 'WIFI', value: 'WIFI' },
          { text: 'actions'}
        ],
        HOTELS: []
      }
    },
    created(){
      //Запрос на получение данных
      axios
      .get('http://localhost:8081/api/HOTELS')
      .then(response =>{
        console.log(response)
        this.HOTELS = response.data
        })
      .catch(error=>{
        console.log(error)
      })
    },
    methods: {
      deleteItem(item){
        const index = this.HOTELS.indexOf(item)

        axios 
        .delete(`http://localhost:8081/api/HOTELS/${index}`)
        .then(response =>{
          console.log(response)
        })
        .catch(error =>{
          console.log(error)
        })
      }
    }
  }
</script>