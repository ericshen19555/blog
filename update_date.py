import os
import sys
from datetime import datetime


def update_file_date(file_path):
    # 檢查路徑是否存在且為檔案
    if not os.path.isfile(file_path):
        print(f"錯誤：找不到檔案 {file_path}")
        return

    try:
        # 1. 取得檔案的最後修改時間並格式化
        mtime = os.path.getmtime(file_path)
        formatted_time = datetime.fromtimestamp(mtime).strftime(
            r"%Y-%m-%d %H:%M:%S"
        )
        new_date_line = f"date: {formatted_time}\n"

        # 2. 讀取檔案內容
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        # 3. 尋找並修改第一行以 'date:' 開頭的文字
        modified = False
        for i, line in enumerate(lines):
            if line.strip().startswith("date:"):
                lines[i] = new_date_line
                modified = True
                break  # 只修改找到的第一行

        # 4. 如果有修改，將新內容寫回檔案
        if modified:
            with open(file_path, "w", encoding="utf-8") as f:
                f.writelines(lines)
            print(f"成功更新！{os.path.basename(file_path)} -> {new_date_line.strip()}")
        else:
            print(f"提示：在 {os.path.basename(file_path)} 中找不到以 'date:' 開頭的行。")

    except Exception as e:
        print(f"處理檔案時發生錯誤: {e}")


if __name__ == "__main__":
    print("一行輸入一個地址：")
    while True:
        path = input()
        if not path: break
        update_file_date(path)
    input("按任意鍵結束...")
