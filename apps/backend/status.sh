#!/bin/bash

# 后端服务状态检查脚本
# 使用方式: ./status.sh 或 bash status.sh

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

echo -e "${BLUE}🔍 检查 $SERVICE_NAME 状态...${NC}"

# ========== 检查服务状态 ==========
SERVICE_RUNNING=false
if [ -f "$PID_FILE" ]; then
    PGID=$(cat "$PID_FILE" | tr -d ' ')
    if ps -o pid= -g "$PGID" 2>/dev/null | grep -q .; then
        SERVICE_RUNNING=true
        echo -e "${GREEN}✅ $SERVICE_NAME 正在运行${NC}"
        echo -e "${BLUE}📊 进程组ID: $PGID${NC}"
        echo -e "${BLUE}📋 相关进程:${NC}"
        ps -g "$PGID" -o pid,cmd --no-headers | sed 's/^/  /'
    else
        echo -e "${YELLOW}⚠️  PID 文件存在但无活跃进程${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  $PID_FILE 不存在${NC}"
fi

# ========== 端口与服务响应检查 ==========
PORT_PID=$(lsof -ti:$PORT 2>/dev/null)

if [ "$SERVICE_RUNNING" = true ]; then
    echo -e "${BLUE}🌐 监听端口: $PORT${NC}"
    
    # 服务响应测试
    echo -e "${BLUE}🔗 测试服务连接...${NC}"
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:$PORT | grep -q "200\|404"; then
        echo -e "${GREEN}✅ 服务响应正常${NC}"
    else
        echo -e "${YELLOW}⚠️ 服务可能无响应${NC}"
    fi
    
    # 日志
    if [ -f "$LOG_FILE" ]; then
        echo -e "${BLUE}📝 最近日志:${NC}"
        tail -n 5 "$LOG_FILE" | sed 's/^/  /'
    fi
else
    echo -e "${RED}❌ $SERVICE_NAME 未运行${NC}"
    echo -e "${YELLOW}💡 启动命令: ./start.sh${NC}"
    
    # 检查是否有残留进程
    echo -e "${BLUE}🔍 检查相关进程...${NC}"
    if pgrep -f "$PROCESS_PATTERN" > /dev/null; then
        ps aux | grep -v grep | grep "$PROCESS_PATTERN" | sed 's/^/  /'
    else
        echo -e "  无相关进程"
    fi
fi

# ========== 系统资源、Bun版本、文件检查 ==========
echo -e "${BLUE}💻 系统资源:${NC}"

# 安全获取 CPU 和内存
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1 2>/dev/null || echo "N/A")
MEM_INFO=$(free -h | grep Mem 2>/dev/null)
if [ -n "$MEM_INFO" ]; then
    MEM_USED=$(echo "$MEM_INFO" | awk '{print $3}')
    MEM_TOTAL=$(echo "$MEM_INFO" | awk '{print $2}')
    MEM_USAGE="$MEM_USED/$MEM_TOTAL"
else
    MEM_USAGE="N/A"
fi

echo -e "  CPU使用率: ${CPU_USAGE}%"
echo -e "  内存使用: $MEM_USAGE"

if command -v bun &> /dev/null; then
    echo -e "${BLUE}📦 Bun版本: $(bun --version)${NC}"
else
    echo -e "${RED}❌ 未找到bun${NC}"
fi

echo -e "${BLUE}📁 文件检查:${NC}"
required_files=("package.json" "dist/index.js" ".env" ".env.production")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✅ $file${NC}"
    else
        echo -e "  ${RED}❌ $file 缺失${NC}"
    fi
done

# ========== 管理命令 ==========
echo -e "${BLUE}💡 管理命令:${NC}"
echo -e "  启动服务: ./start.sh"
echo -e "  停止服务: ./stop.sh"
echo -e "  查看日志: tail -f $LOG_FILE"
echo -e "  清理日志: echo '' > $LOG_FILE"