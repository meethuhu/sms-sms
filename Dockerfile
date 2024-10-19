# 使用官方Node.js 22镜像作为基础镜像
FROM node:22

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码
COPY . .

# 暴露3000端口
EXPOSE 3000

# 启动应用
CMD [ "node", "src/app.js" ]
