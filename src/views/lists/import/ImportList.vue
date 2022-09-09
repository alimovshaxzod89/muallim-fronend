<template>
    <div>
        <h4>Export uchun namuna</h4>
        <v-btn color="success">Exceldan export qilish</v-btn>
        <v-file-input
            counter
            multiple
            truncate-length="50"
            label="Excel fileni kiriting"
            @keyup.enter='onChange'
        ></v-file-input>
        <v-btn color="info" @click="onChange">Import qilish</v-btn>
    </div>
</template>

<script>
import XLSX from "xlsx"
export default {
    setup(){
        
    }
}
</script>

<style>

</style>