#!/bin/bash
set -e

# ========== 配置定义 ==========
SERVICE_NAME="后端服务"
PORT=9002
PID_FILE="app.pid"
LOG_DIR="logs"
LOG_FILE="$LOG_DIR/app.log"
PROCESS_PATTERN="bun.*start"

# ========== 颜色定义 ==========
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ========== 启动横幅 ==========
echo -e "${GREEN}🚀 启动 $SERVICE_NAME...${NC}"

# ========== 防重复启动 ==========
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat $PID_FILE)
    if kill -0 $OLD_PID 2>/dev/null; then
        echo -e "${YELLOW}⚠️  $SERVICE_NAME 已在运行 (PID: $OLD_PID)，请先停止再启动${NC}"
        echo -e "${BLUE}💡 停止命令: ./stop.sh${NC}"
        exit 1
    else
        echo -e "${YELLOW}⚠️  $PID_FILE 存在但进程已死，清理中...${NC}"
        rm -f $PID_FILE
    fi
fi

# ========== 检查必要文件 ==========
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 当前目录没有找到 package.json 文件${NC}"
    echo -e "${YELLOW}请确保在项目根目录下运行此脚本${NC}"
    exit 1
fi

if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ 错误: 没有找到编译后的文件 dist/index.js${NC}"
    echo -e "${YELLOW}请先运行: bun run build${NC}"
    exit 1
fi

# ========== 显式加载 volta 环境（关键！）==========
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

# ========== 创建日志目录 ==========
mkdir -p $LOG_DIR

# ========== 设置环境变量 ==========
export NODE_ENV=production

# ========== 启动参数预览 ==========
echo -e "${BLUE}🔧 启动配置:${NC}"
echo -e "${BLUE}  - 环境: $NODE_ENV${NC}"
echo -e "${BLUE}  - 服务端口: $PORT${NC}"
echo -e "${BLUE}  - .env 文件: $( [ -f .env ] && echo '✅ 存在' || echo '⚠️ 不存在' )${NC}"
echo -e "${BLUE}  - .env.production: $( [ -f .env.production ] && echo '✅ 存在' || echo '⚠️ 不存在' )${NC}"
echo -e "${BLUE}  - 执行命令: bun run start${NC}"
echo -e "${BLUE}  - 日志文件: $LOG_FILE${NC}"
echo -e "${YELLOW}🔄 正在启动服务...${NC}"

# ========== 记录启动时间 ==========
echo "=== 启动于: $(date) ===" >> $LOG_FILE

# ========== 启动服务（使用 package.json 中的 start 命令）==========
# 启动时创建新的进程组（使用 setsid）
#setsid 会让进程脱离当前会话，创建新的进程组，PGID = 新进程的 PID
setsid nohup bun run start >> $LOG_FILE 2>&1 &
PID=$!
PGID=$(ps -o pgid= -p $PID | tr -d ' ')
echo $PGID > $PID_FILE  # 保存 PGID 而不是 PID
echo -e "${BLUE}📝 进程组ID (PGID) 已保存到 $PID_FILE: $PGID${NC}"
# ========== 保存 PID ==========
PID=$!
echo "启动进程 PID: $PID" >> $LOG_FILE
echo $PID > $PID_FILE

# ========== 验证 PID 文件创建 ==========
if [ ! -f "$PID_FILE" ]; then
    echo -e "${RED}❌ 错误: PID 文件创建失败${NC}"
    exit 1
fi

echo -e "${BLUE}📝 PID 已保存到 $PID_FILE: $PID${NC}"

# ========== 等待并检查 ==========
sleep 3

if kill -0 $PID 2>/dev/null; then
    echo -e "${GREEN}✅ $SERVICE_NAME 启动成功！${NC}"
    echo -e "${GREEN}📊 进程ID: $PID${NC}"
    echo -e "${GREEN}📋 日志文件: $LOG_FILE${NC}"
    echo -e "${GREEN}🌐 服务端口: $PORT${NC}"
    echo -e "${BLUE}💡 管理命令:${NC}"
    echo -e "${BLUE}   停止: ./stop.sh${NC}"
    echo -e "${BLUE}   查看日志: tail -f $LOG_FILE${NC}"
    echo -e "${BLUE}   查看状态: ./status.sh${NC}"
    
    # ========== 验证服务是否响应 ==========
    echo -e "${BLUE}🔗 验证服务响应...${NC}"
    sleep 2
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|404"; then
        echo -e "${GREEN}✅ 服务响应正常${NC}"
    else
        echo -e "${YELLOW}⚠️ 服务可能还在初始化中${NC}"
    fi
else
    echo -e "${RED}❌ $SERVICE_NAME 启动失败！${NC}"
    echo -e "${YELLOW}🔍 请检查日志: cat $LOG_FILE${NC}"
    rm -f $PID_FILE
    exit 1
fi