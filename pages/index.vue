<template>
  <div>
    <n-layout position="absolute" class="root-layout">
      <n-layout-header bordered class="nav">
        <n-text tag="div" class="ui-logo" :depth="1">Link Shortener</n-text>
        <n-space vertical>&nbsp;</n-space>
        <div class="nav-end">
          <n-button size="small" tag="div" quaternary class="nav-picker">
            {{ user.first_name }}
          </n-button>
        </div>
      </n-layout-header>
      <n-layout-content class="main-content">
        <div v-if="pending">Carregando links...</div>
        <div v-if="error">Erro ao carregar links: {{ error }}</div>
        <div v-if="links">
          <h1>Links</h1>
          <n-grid :cols="4">
            <n-gi v-for="link of links" :key="link">
              <n-card :title="link">
                {{ link }}
              </n-card>
            </n-gi>
          </n-grid>
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script lang="ts" setup>
  import { NCard, NGi, NGrid, NLayout, NLayoutContent, NLayoutHeader, NSpace } from 'naive-ui'
  const token = useToken()
  const user = useUser()

  if (!token.value) await navigateTo({ path: '/login' })

  const {
    data: links,
    error,
    pending
  } = token.value
    ? await useFetch('/api/links', {
        headers: { Authorization: token.value }
      })
    : ({} as any)
</script>

<style scoped>
  .nav {
    display: grid;
    align-items: center;
    padding: 0 32px;
    grid-template: 60px / auto 1fr auto;
  }

  .ui-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  .main-content {
    padding: 32px;
  }

  .nav-end {
    display: flex;
    align-items: center;
  }

  .nav-picker {
    margin-right: 4px;
  }
  .nav-picker.padded {
    padding: 0 10px;
  }
  .nav-picker:last-child {
    margin-right: 0;
  }
</style>
