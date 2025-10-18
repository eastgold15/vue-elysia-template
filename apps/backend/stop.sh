#!/bin/bash

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

echo -e "${BLUE}🛑 停止 $SERVICE_NAME...${NC}"

# ========== 辅助函数：停止进程组 ==========
stop_pgid() {
    local pgid=$1
    echo -e "${BLUE}⏳ 正在停止进程组 -$pgid...${NC}"
    
    # 发送 SIGTERM 到整个进程组（注意负号！）
    kill -- -$pgid 2>/dev/null || true
    sleep 3

    # 检查是否还有残留
    if ps -o pid= -g $pgid 2>/dev/null | grep -q .; then
        echo -e "${YELLOW}⚠️  仍有残留进程，强制终止...${NC}"
        kill -9 -- -$pgid 2>/dev/null || true
        sleep 1
    fi

    # 最终检查
    if ps -o pid= -g $pgid 2>/dev/null | grep -q .; then
        echo -e "${RED}❌ 进程组 -$pgid 无法完全终止${NC}"
        return 1
    else
        echo -e "${GREEN}✅ 进程组 -$pgid 已完全停止${NC}"
        return 0
    fi
}

# ========== 主逻辑 ==========
if [ ! -f "$PID_FILE" ]; then
    echo -e "${YELLOW}⚠️  $PID_FILE 不存在，服务可能未运行${NC}"
    
    # 回退：尝试按名称杀死所有 bun 进程
    echo -e "${BLUE}🔍 查找并停止所有相关进程...${NC}"
    if pkill -f "$PROCESS_PATTERN" 2>/dev/null; then
        sleep 2
        echo -e "${GREEN}✅ 已停止所有匹配进程${NC}"
    else
        echo -e "${GREEN}✅ 未发现运行中的相关进程${NC}"
    fi
    exit 0
fi

# 读取的是 PGID（进程组ID），不是 PID！
PGID=$(cat "$PID_FILE" | tr -d ' ')
echo -e "${BLUE}📝 读取到进程组ID (PGID): $PGID${NC}"

# 验证 PGID 是否有效（是否有进程属于该组）
if ps -o pid= -g "$PGID" 2>/dev/null | grep -q .; then
    stop_pgid "$PGID"
else
    echo -e "${YELLOW}⚠️  进程组 $PGID 不存在或已停止${NC}"
fi

# 清理 PID 文件
rm -f "$PID_FILE"
echo -e "${GREEN}🧹 已清理 PID 文件${NC}"

# 记录停止时间
echo "=== 停止于: $(date) ===" >> "$LOG_FILE" 2>/dev/null || true