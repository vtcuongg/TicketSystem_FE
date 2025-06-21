export const knowledgeBase = {
    documents: [
        {
            id: "doc-role-functions",
            title: "Chức năng theo vai trò trong Hệ thống Ticket",
            content: `
# Chức năng của từng vai trò người dùng trong hệ thống Ticket System

Hệ thống Ticket System phân chia quyền hạn và chức năng rõ ràng cho 4 vai trò chính để đảm bảo quản lý hiệu quả.

## 1. Người yêu cầu (User)
Là người sử dụng dịch vụ hoặc cần hỗ trợ, có thể là sinh viên, cán bộ, hoặc khách hàng.
- **Tạo yêu cầu mới**: Gửi các ticket về vấn đề hoặc nhu cầu cần được giải quyết.
- **Theo dõi ticket**: Kiểm tra trạng thái và tiến độ của các yêu cầu đã gửi.
- **Tương tác ticket**: Gửi phản hồi, thêm tin nhắn, đính kèm tài liệu vào ticket đang xử lý.
- **Đánh giá dịch vụ**: Cung cấp phản hồi về chất lượng xử lý sau khi ticket hoàn thành.
- **Nhận thông báo**: Được thông báo về các cập nhật trạng thái của ticket.

## 2. Quản lý (Manager)
Là trưởng bộ phận hoặc người đứng đầu phòng ban, giám sát hoạt động của đội ngũ và ticket thuộc phòng ban mình.
- **Tổng quan ticket**: Xem tất cả các ticket thuộc phòng ban mình quản lý.
- **Phân công nhiệm vụ**: Gán ticket cho nhân viên (Employee) cụ thể để xử lý.
- **Theo dõi tiến trình**: Giám sát hiệu suất xử lý của nhân viên và trạng thái chung của ticket.
- **Duyệt/Xác nhận**: Xác nhận hoàn thành hoặc duyệt các thay đổi quan trọng của ticket.
- **Xem báo cáo**: Truy cập các thống kê và báo cáo về hiệu suất của phòng ban.

## 3. Người xử lý (Employee)
Là nhân viên trực tiếp tiếp nhận và giải quyết các yêu cầu hỗ trợ.
- **Nhận ticket**: Xem các ticket đã được phân công cho mình hoặc các ticket mới trong phòng ban cần được nhận.
- **Cập nhật trạng thái**: Đổi trạng thái ticket (ví dụ: sang "Đang xử lý", "Chờ phản hồi").
- **Phản hồi người yêu cầu**: Cung cấp thông tin, giải pháp hoặc yêu cầu thêm dữ liệu từ người gửi.
- **Đính kèm tài liệu**: Thêm các file hướng dẫn, giải pháp vào ticket.
- **Hoàn thành ticket**: Đóng ticket khi vấn đề đã được giải quyết.

## 4. Admin
Là quản trị viên hệ thống, có quyền hạn cao nhất để cấu hình và quản lý toàn bộ hệ thống.
- **Quản lý người dùng**: Thêm, sửa, xóa người dùng và phân quyền (gán vai trò User, Employee, Manager, Admin).
- **Quản lý cấu hình**: Quản lý danh mục ticket, phòng ban, mức độ ưu tiên.
- **Kiểm soát quyền truy cập**: Điều chỉnh chi tiết quyền hạn cho mọi vai trò.
- **Xem báo cáo hệ thống**: Truy cập mọi báo cáo và nhật ký hoạt động của toàn bộ hệ thống.

❓ **Gợi ý tìm kiếm**:
- "Người dùng có chức năng gì?"
- "Manager làm gì trong hệ thống?"
- "Employee xử lý ticket như thế nào?"
- "Admin có quyền gì?"
- "Các vai trò trong Ticket System?"
`
        },
        {
            id: "doc-departments",
            title: "Danh sách các Phòng ban và trách nhiệm chính trong Hệ thống",
            content: `
# Các Phòng ban và trách nhiệm chính trong hệ thống Ticket System

Dưới đây là danh sách các phòng ban đã được cấu hình trong hệ thống, cùng với các loại yêu cầu chính mà họ thường xử lý.

## Danh sách Phòng ban:
- **Phòng Công tác Sinh viên**: Phụ trách các vấn đề như **Miễn giảm học phí**, **Chính sách đãi ngộ**, **Ký túc xá**, **Bảo hiểm**, **Hỗ trợ đời sống cán bộ**.
  *Phòng Công tác Sinh viên xử lý vấn đề gì? Phòng Công tác Sinh viên phụ trách những vấn đề gì? Vấn đề miễn giảm học phí liên hệ phòng nào? Ký túc xá thuộc phòng ban nào? Ai phụ trách các chính sách đãi ngộ?*
- **Phòng Hành chính - Tổng hợp**: Phụ trách các yêu cầu về **Cấp giấy tờ**, **Nhân sự** (như đơn từ nhân sự, thông tin cá nhân, quy định).
  *Phòng Hành chính - Tổng hợp xử lý gì? Tôi cần cấp giấy tờ thì gửi yêu cầu cho phòng nào? Vấn đề nhân sự thuộc phòng ban nào? Phòng ban nào cấp giấy tờ xác nhận?*
- **Phòng Đào tạo**: Phụ trách các vấn đề về **Học vụ** (như đăng ký học, điểm số, lịch thi, chương trình học, tốt nghiệp).
  *Phòng Đào tạo xử lý vấn đề gì? Vấn đề học vụ liên hệ phòng nào? Lịch thi, điểm số hỏi phòng nào? Đăng ký học phần thì liên hệ phòng nào?*
- **Phòng Kỹ thuật, IT (CNTT)**: Xử lý các vấn đề về **Xử lý lỗi hệ thống**, **Hỗ trợ CNTT chung**, **Hỗ trợ phần mềm**, **Mạng nội bộ**, **Quản lý máy chủ**, **An toàn dữ liệu**.
  *Phòng Kỹ thuật IT xử lý gì? Tôi bị lỗi hệ thống thì hỏi phòng nào? Vấn đề mạng nội bộ, máy chủ liên hệ phòng nào? Lỗi máy tính liên hệ phòng ban nào? Ai hỗ trợ về phần mềm?*
- **Phòng Kế hoạch - Tài chính**: Phụ trách các vấn đề liên quan đến **Học phí**, **Học bổng**, **Thu chi**.
  *Phòng Kế hoạch - Tài chính xử lý vấn đề gì? Phòng ban nào phụ trách học phí? Vấn đề học bổng liên hệ phòng nào? Ai giải quyết vấn đề nợ học phí?*
- **Phòng Khảo thí & Đảm bảo Chất lượng**: Phụ trách **Giám sát thi cử**, **Đánh giá chất lượng**.
  *Phòng Khảo thí và Đảm bảo Chất lượng làm gì? Vấn đề thi cử liên hệ phòng nào? Đánh giá chất lượng liên quan đến phòng nào?*
- **Phòng Thanh tra - Pháp chế**: Xử lý các vấn đề về **Khiếu nại**, **Tố cáo**, **Giám sát nội quy**.
  *Phòng Thanh tra Pháp chế xử lý gì? Tôi muốn khiếu nại thì gửi đến phòng nào? Vấn đề tố cáo, nội quy hỏi phòng nào?*
- **Phòng Cơ sở Vật chất**: Phụ trách **Sửa chữa phòng học**, **Thiết bị giảng dạy**.
  *Phòng Cơ sở Vật chất xử lý gì? Hỏng thiết bị giảng dạy liên hệ phòng nào? Sửa chữa phòng học gửi yêu cầu cho phòng nào? Tôi muốn sửa máy chiếu trong phòng học thì liên hệ ai?*
- **Trung tâm Hỗ trợ Sinh viên & Quan hệ Doanh nghiệp**: Phụ trách các yêu cầu về **Việc làm**, **Kỹ năng mềm**.
  *Trung tâm Hỗ trợ Sinh viên & Quan hệ Doanh nghiệp phụ trách gì? Vấn đề việc làm, kỹ năng mềm liên hệ đâu? Ai hỗ trợ tìm kiếm việc làm?*
- **Công đoàn**: Phụ trách các vấn đề liên quan đến **quyền lợi công đoàn**, **hoạt động công đoàn**.
  *Công đoàn xử lý vấn đề gì?*
- **Đoàn Thanh niên, Hội Sinh viên**: Phụ trách **Hoạt động ngoại khóa**, **Tình nguyện**, **Câu lạc bộ**.
  *Đoàn Thanh niên Hội Sinh viên làm gì? Hoạt động ngoại khóa liên hệ ai? Vấn đề câu lạc bộ hỏi phòng nào?*
- **Các khoa chuyên ngành**: Phụ trách **Xác nhận học phần**, **Xét duyệt đề tài nghiên cứu**.
  *Các khoa chuyên ngành xử lý gì? Vấn đề xác nhận học phần, đề tài nghiên cứu liên hệ khoa nào?*

❓ **Gợi ý tìm kiếm chung**:
- "Phòng ban nào xử lý vấn đề học phí?"
- "Tôi cần gửi yêu cầu về ký túc xá cho phòng nào?"
- "Chức năng của phòng Kỹ thuật, IT là gì?"
- "Danh sách các phòng ban hỗ trợ?"
- "Phòng ban phụ trách nhân sự?"
- "Phòng Công tác Sinh viên giải quyết những vấn đề gì?"
- "Tôi muốn biết về học bổng thì hỏi phòng nào?"
- "Lỗi máy tính liên hệ phòng ban nào?"
- "Ai hỗ trợ về phần mềm?"
- "Tôi muốn sửa máy chiếu thì liên hệ phòng nào?"
- "Phòng nào cấp giấy tờ xác nhận?"
- "Phòng ban nào phụ trách đăng ký học phần?"
- "Ai hỗ trợ tìm kiếm việc làm?"
`
        },
        {
            id: "doc-user-flow",
            title: "Luồng hoạt động của Người dùng (User Flow)",
            content: `
# Hướng dẫn Luồng hoạt động của Người dùng (User)

Đây là các bước cơ bản mà một Người dùng sẽ thực hiện khi sử dụng hệ thống Ticket System để tạo và theo dõi yêu cầu của mình.

1.  **Đăng nhập hệ thống**: Người dùng truy cập vào trang web của Ticket System và đăng nhập bằng tài khoản của mình.
2.  **Tạo yêu cầu mới**:
    * Điều hướng đến chức năng "Tạo yêu cầu mới" hoặc "Gửi ticket" trên giao diện hệ thống. Nút này thường nằm ở vị trí nổi bật như góc trên bên phải hoặc trong menu điều hướng.
    * Nhấp vào nút hoặc liên kết để mở biểu mẫu tạo yêu cầu.
3.  **Điền thông tin ticket**:
    -   Nhập **Tiêu đề** ngắn gọn, rõ ràng cho yêu cầu (ví dụ: "Lỗi không truy cập được Wi-Fi", "Yêu cầu cấp lại bảng điểm").
    -   Viết **Mô tả chi tiết** về vấn đề hoặc nhu cầu. Cung cấp đầy đủ thông tin để nhân viên hỗ trợ có thể hiểu rõ và xử lý nhanh chóng (ví dụ: mô tả lỗi, các bước đã thử, thời gian xảy ra, ảnh chụp màn hình nếu có).
    -   **Chọn Danh mục** phù hợp nhất với yêu cầu của bạn từ danh sách có sẵn (ví dụ: "Lỗi phần mềm", "Yêu cầu tài liệu", "Miễn giảm học phí"). Việc chọn đúng danh mục giúp ticket được chuyển đến phòng ban phụ trách nhanh hơn.
    -   **Chọn mức độ Ưu tiên** của yêu cầu (ví dụ: "Thấp", "Trung bình", "Cao", "Khẩn cấp"). Hãy chọn mức độ ưu tiên phù hợp với mức độ ảnh hưởng của vấn đề.
    -   **(Tùy chọn)** Chọn **Phòng ban liên quan** nếu bạn đã biết rõ phòng ban nào phụ trách vấn đề của mình. Điều này giúp đẩy nhanh quá trình xử lý.
4.  **Đính kèm file**: (Tùy chọn) Tải lên hình ảnh, tài liệu, hoặc các file khác để minh họa hoặc cung cấp thêm thông tin cho yêu cầu (ví dụ: ảnh lỗi, giấy tờ liên quan).
5.  **Gửi yêu cầu**: Nhấn nút "Gửi" hoặc "Tạo Ticket" để hoàn tất việc tạo yêu cầu. Hệ thống sẽ gửi thông báo xác nhận và cấp một mã số ticket để bạn tiện theo dõi.
6.  **Theo dõi trạng thái**: Truy cập mục "Ticket của tôi" hoặc "Lịch sử yêu cầu" để xem tình trạng hiện tại của ticket và các cập nhật mới nhất.
7.  **Nhận thông báo**: Người dùng sẽ nhận được thông báo qua email hoặc trong hệ thống khi có cập nhật trạng thái từ nhân viên xử lý (ví dụ: đã tiếp nhận, đang xử lý, cần thêm thông tin).
8.  **Tương tác**: Gửi phản hồi, thêm tin nhắn hoặc cung cấp thông tin bổ sung cho ticket đang xử lý nếu nhân viên yêu cầu hoặc bạn muốn cung cấp thêm chi tiết.
9.  **Đánh giá & Đóng ticket**: Khi vấn đề đã được giải quyết, người dùng có thể đánh giá chất lượng dịch vụ của nhân viên và xác nhận đóng ticket.

❓ **Gợi ý tìm kiếm**:
- "Làm thế nào để tạo một yêu cầu hỗ trợ mới?"
- "Hướng dẫn gửi ticket?"
- "Cách tạo ticket trong hệ thống?"
- "Các bước để gửi một yêu cầu hỗ trợ?"
- "Luồng tạo ticket của user?"
- "Tôi muốn gửi yêu cầu về [vấn đề cụ thể] thì chọn danh mục nào?"
- "Tôi nên chọn mức độ ưu tiên nào cho yêu cầu về [vấn đề]?"
- "Ticket của tôi đang ở trạng thái 'Đang xử lý' có nghĩa là gì?"
- "Khi ticket chuyển sang 'Chờ phản hồi', tôi cần làm gì?"
- "Làm sao để thêm thông tin hoặc đính kèm tài liệu vào ticket của tôi?"
- "Khi ticket của tôi được 'Đã hoàn thành', tôi có cần làm gì nữa không?"
- "Tôi có thể đánh giá dịch vụ sau khi ticket được đóng không?"
- "Làm sao để hủy một yêu cầu mà tôi đã gửi?"
- "Cách điền thông tin khi tạo yêu cầu mới?"
- "Chọn danh mục và ưu tiên khi gửi ticket?"
`
        },
        {
            id: "doc-manager-flow",
            title: "Luồng hoạt động của Quản lý (Manager Flow)",
            content: `
# Hướng dẫn Luồng hoạt động của Quản lý (Manager)

Quản lý sử dụng hệ thống Ticket System để giám sát, phân công và đảm bảo các yêu cầu được xử lý hiệu quả trong phòng ban của mình.

1.  **Đăng nhập hệ thống**: Truy cập vào hệ thống Ticket System bằng tài khoản Quản lý.
2.  **Xem tổng quan ticket**: Truy cập Dashboard hoặc mục "Quản lý Ticket của phòng ban" để xem toàn bộ các ticket mới hoặc đang chờ xử lý trong phạm vi quản lý.
3.  **Xem chi tiết ticket**: Chọn một ticket cụ thể để xem toàn bộ thông tin, lịch sử trao đổi và các cập nhật liên quan.
4.  **Phân công ticket**: Gán ticket cho một Nhân viên (Employee) cụ thể trong phòng ban để đảm nhiệm việc xử lý.
5.  **Theo dõi tiến trình**: Giám sát trạng thái ticket, thời gian xử lý, và hiệu suất làm việc của nhân viên được phân công.
6.  **Xem báo cáo**: Truy cập các báo cáo thống kê chuyên sâu về số lượng ticket, thời gian xử lý trung bình, hiệu suất của phòng ban.
7.  **(Tùy chọn) Điều chỉnh/Xác nhận**: Có thể thay đổi mức độ ưu tiên của ticket, chuyển ticket sang phòng ban khác, hoặc xác nhận hoàn thành ticket sau khi kiểm tra.

❓ **Gợi ý tìm kiếm**:
- "Cách Manager phân công ticket?"
- "Làm sao để xem báo cáo của phòng ban?"
- "Manager theo dõi ticket như thế nào?"
- "Luồng công việc của trưởng phòng?"
- "Tôi có thể xem tổng quan tất cả các ticket của phòng ban tôi ở đâu?"
- "Tôi muốn theo dõi tiến độ xử lý của [tên nhân viên] đối với các ticket của họ."
- "Tôi có thể điều chỉnh mức độ ưu tiên của một ticket không?"
- "Tôi có cần duyệt các ticket đã hoàn thành của nhân viên không?"
- "Làm cách nào để truy cập báo cáo về thời gian phản hồi trung bình của phòng tôi?"
- "Tôi muốn xem những ticket nào đang bị quá hạn trong phòng tôi."
- "Có báo cáo nào về sự hài lòng của người dùng đối với dịch vụ của phòng tôi không?"
`
        },
        {
            id: "doc-employee-flow",
            title: "Luồng hoạt động của Nhân viên (Employee Flow)",
            content: `
# Hướng dẫn Luồng hoạt động của Nhân viên (Employee Flow)

Nhân viên là người trực tiếp xử lý các yêu cầu hỗ trợ được phân công.

1.  **Đăng nhập hệ thống**: Truy cập vào hệ thống Ticket System bằng tài khoản Nhân viên.
2.  **Xem ticket được phân công**: Xem danh sách các ticket đã được phân công cho mình hoặc các ticket mới trong phòng ban cần được nhận.
3.  **Bắt đầu xử lý**: Chọn một ticket để xem chi tiết và cập nhật trạng thái từ "Mới" sang "Đang xử lý".
4.  **Tương tác và xử lý**:
    -   Gửi phản hồi cho người yêu cầu để hỏi thêm thông tin hoặc thông báo tiến độ.
    -   Cập nhật thông tin chi tiết về quá trình xử lý.
    -   **(Tùy chọn)** Đính kèm tài liệu, hướng dẫn, hoặc file giải pháp.
    -   Gửi ghi chú nội bộ (chỉ hiển thị cho nhân viên xử lý và quản lý) để lưu lại thông tin quan trọng.
5.  **Hoàn thành ticket**: Sau khi vấn đề được giải quyết, chuyển trạng thái ticket sang "Đã hoàn thành" hoặc "Đã đóng".

❓ **Gợi ý tìm kiếm**:
- "Cách Employee xử lý ticket?"
- "Làm sao để cập nhật trạng thái ticket?"
- "Employee gửi phản hồi cho người dùng?"
- "Luồng xử lý ticket của nhân viên?"
- "Tôi xem các ticket được phân công cho mình ở đâu?"
- "Làm thế nào để thay đổi trạng thái ticket sang 'Đang xử lý'?"
- "Tôi cần phản hồi người yêu cầu để hỏi thêm thông tin, làm thế nào?"
- "Làm sao để đính kèm file giải pháp vào ticket?"
- "Khi nào tôi nên đánh dấu ticket là 'Đã hoàn thành'?"
- "Tôi có thể thêm ghi chú nội bộ vào ticket không?"
- "Nếu tôi không thể tự giải quyết ticket này, tôi có thể chuyển nó cho ai?"
- "Tôi nên ưu tiên xử lý ticket nào trước?"
`
        },
        {
            id: "doc-admin-functions",
            title: "Chức năng của Quản trị viên (Admin Functions)",
            content: `
# Các chức năng quản trị của Admin trong Hệ thống Ticket System

Admin là người có quyền hạn cao nhất, chịu trách nhiệm quản lý và cấu hình toàn bộ hệ thống.

## 1. Quản lý người dùng
- **Thêm/Sửa/Xóa người dùng**: Tạo tài khoản mới, chỉnh sửa thông tin hoặc xóa tài khoản người dùng khỏi hệ thống.
- **Phân quyền người dùng**: Gán hoặc thay đổi vai trò (User, Employee, Manager, Admin) cho bất kỳ tài khoản nào.
- **Kiểm soát truy cập**: Thiết lập các quy tắc và chính sách bảo mật liên quan đến quyền truy cập của từng vai trò.

## 2. Quản lý cấu hình hệ thống
- **Quản lý danh mục ticket**: Thêm, sửa, xóa các danh mục để phân loại yêu cầu (ví dụ: "IT - Phần cứng", "Hành chính - Nhân sự", "Học vụ").
- **Quản lý phòng ban**: Thêm, sửa, xóa các phòng ban và gán Quản lý (Manager) cho từng phòng ban.
- **Cấu hình mức độ ưu tiên**: Định nghĩa các mức độ ưu tiên (Khẩn cấp, Cao, Trung bình, Thấp) và các thông số liên quan (thời gian xử lý dự kiến).
- **Quản lý mẫu thông báo**: Chỉnh sửa nội dung các mẫu thông báo tự động (email, thông báo trong hệ thống).

## 3. Giám sát và Báo cáo
- **Xem toàn bộ báo cáo**: Truy cập tất cả các loại báo cáo và thống kê tổng quan về hoạt động của hệ thống (hiệu suất, số lượng ticket, v.v.).
- **Kiểm tra nhật ký hệ thống**: Xem các log hoạt động để theo dõi các sự kiện quan trọng và phát hiện lỗi.

## 4. Bảo trì hệ thống
- Thực hiện các tác vụ bảo trì định kỳ, sao lưu dữ liệu, kiểm tra tính toàn vẹn của hệ thống.

❓ **Gợi ý tìm kiếm**:
- "Admin quản lý người dùng như thế nào?"
- "Admin có thể làm gì với phòng ban?"
- "Cách phân quyền trong hệ thống?"
- "Chức năng của tài khoản Admin?"
- "Admin quản lý danh mục ticket?"
- "Làm thế nào để thêm một tài khoản người dùng mới và phân quyền cho họ?"
- "Tôi muốn chỉnh sửa thông tin của một người dùng hoặc thay đổi vai trò của họ."
- "Làm sao để thêm một phòng ban mới vào hệ thống?"
- "Tôi có thể tạo danh mục ticket mới (ví dụ: 'Yêu cầu phòng học') không?"
- "Làm thế nào để cấu hình lại các mức độ ưu tiên và thời gian xử lý mặc định?"
- "Tôi có thể chỉnh sửa mẫu thông báo email cho người dùng không?"
- "Làm cách nào để xem tất cả các báo cáo và thống kê của toàn hệ thống?"
- "Tôi muốn kiểm tra nhật ký hoạt động của hệ thống để tìm lỗi."
- "Có thể xem danh sách các ticket chưa được phân công hoặc chưa được phản hồi không?"
`
        },
        {
            id: "doc-priority-levels",
            title: "Mức độ ưu tiên của Ticket (Priority Levels)",
            content: `
# Mức độ ưu tiên ticket là gì? Và thời gian xử lý dự kiến

Khi tạo hoặc quản lý yêu cầu hỗ trợ (ticket), bạn có thể chọn một trong các mức độ ưu tiên sau. Mức độ ưu tiên này sẽ quyết định thứ tự và thời gian hệ thống cố gắng xử lý yêu cầu của bạn.

## 1. Khẩn cấp (Urgent)
- ⚠️ **Ý nghĩa**: Vấn đề cực kỳ nghiêm trọng, gây ngừng trệ hoặc ảnh hưởng lớn đến hoạt động. Cần được xử lý ngay lập tức.
- 🕐 **Thời gian xử lý dự kiến**: Từ **3 đến 5 giờ làm việc** sau khi ticket được tạo.
- **Đối tượng áp dụng**:
    - Các sự cố hệ thống nghiêm trọng, lỗi bảo mật cấp cao, sự cố khiến nhiều người không thể làm việc.
    - **Các vấn đề học phí gây ảnh hưởng trực tiếp đến việc học tập hoặc đăng ký (ví dụ: không thể đăng ký môn học do lỗi học phí hệ thống, cần xác nhận gấp để hoàn thành thủ tục nhập học/ra trường)**.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Khẩn cấp xử lý bao lâu?"
    - Trả lời: "Nếu bạn chọn mức độ ưu tiên **Khẩn cấp**, ticket của bạn sẽ được xử lý dự kiến từ **3 đến 5 giờ làm việc** sau khi tạo. Mức này dành cho các vấn đề cực kỳ nghiêm trọng như lỗi hệ thống gây ngừng trệ hoạt động hoặc các vấn đề học phí ảnh hưởng trực tiếp đến việc học tập của bạn."
    - Hỏi: "Nếu ưu tiên là khẩn cấp thì xử lý bao lâu?"
    - Hỏi: "Bao lâu xử lý nếu tôi chọn khẩn cấp?"

## 2. Cao (High)
- **Ý nghĩa**: Vấn đề quan trọng, cần được ưu tiên nhưng không khẩn cấp như "Khẩn cấp". Có thể ảnh hưởng đến một nhóm người hoặc một quy trình cụ thể.
- 🕐 **Thời gian xử lý dự kiến**: Trong vòng **1 ngày làm việc**.
- **Đối tượng áp dụng**:
    - Lỗi phần mềm ảnh hưởng một số người, yêu cầu cấp phép quan trọng, vấn đề không gây gián đoạn hoàn toàn.
    - **Các vấn đề học phí cần giải quyết sớm nhưng không đến mức ngừng trệ (ví dụ: cần tra soát khoản thanh toán sắp đến hạn, thắc mắc về công nợ học phí có thể ảnh hưởng đến kỳ thi sắp tới)**.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Ưu tiên cao xử lý bao lâu?"
    - Trả lời: "Với mức độ ưu tiên **Cao**, ticket của bạn sẽ được xử lý dự kiến trong vòng **1 ngày làm việc**. Mức này phù hợp cho các vấn đề quan trọng như tra soát học phí cần giải quyết sớm để không ảnh hưởng đến các hoạt động khác."

## 3. Trung bình (Medium)
- **Ý nghĩa**: Mức ưu tiên mặc định cho các yêu cầu thông thường, không có tính chất khẩn cấp hoặc nghiêm trọng.
- 🕐 **Thời gian xử lý dự kiến**: Trong vòng **3 ngày làm việc**.
- **Đối tượng áp dụng**:
    - Yêu cầu hỗ trợ phần mềm thông thường, thắc mắc về quy trình, yêu cầu cấp phát tài khoản mới.
    - **Các yêu cầu học phí mang tính chất thông tin hoặc giải đáp thắc mắc chung (ví dụ: hỏi về các chính sách học phí, cách thức thanh toán, tra cứu lịch sử giao dịch không khẩn cấp)**.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Ưu tiên trung bình mất bao lâu để xử lý?"
    - Trả lời: "Ticket ưu tiên **Trung bình** dự kiến được xử lý trong vòng **3 ngày làm việc**. Đây là mức mặc định cho các yêu cầu thông thường, như thắc mắc về chính sách học phí hoặc cách thức thanh toán."
    - Hỏi: "Ticket trung bình thì bao lâu mới được giải quyết?"

## 4. Thấp (Low)
- **Ý nghĩa**: Vấn đề nhỏ, không ảnh hưởng đến hoạt động hiện tại và có thể chờ xử lý khi có nguồn lực.
- 🕐 **Thời gian xử lý dự kiến**: Trong vòng **5 ngày làm việc** hoặc khi có thời gian rảnh.
- **Đối tượng áp dụng**:
    - Đề xuất cải tiến nhỏ, yêu cầu thông tin chung, báo cáo lỗi không gây ảnh hưởng lớn.
    - **Các yêu cầu học phí không cấp bách, mang tính chất đề xuất hoặc tra cứu thông tin dự phòng (ví dụ: góp ý về cổng thanh toán, đề xuất thay đổi chính sách học phí)**.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Ưu tiên thấp xử lý trong bao lâu?"
    - Trả lời: "Nếu bạn chọn mức độ ưu tiên **Thấp**, ticket của bạn dự kiến được xử lý trong vòng **5 ngày làm việc** hoặc khi có nguồn lực. Mức này phù hợp cho các vấn đề không cấp bách như góp ý về chính sách học phí."

❓ **Gợi ý tìm kiếm chung**:
- "Mức độ ưu tiên khẩn cấp là gì?"
- "Bao lâu xử lý nếu tôi chọn khẩn cấp?"
- "Sự khác nhau giữa khẩn cấp và cao?"
- "Ưu tiên trung bình có nghĩa là gì?"
- "Khi nào nên chọn ưu tiên thấp?"
- "Thời gian xử lý cho từng loại ưu tiên?"
- "Tôi nên chọn mức độ ưu tiên nào cho yêu cầu về [vấn đề]?"
- "Tôi nên chọn mức độ ưu tiên nào cho yêu cầu về học phí?"
- "Mức độ ưu tiên cho vấn đề học phí là gì?"
- "Nếu tôi có vấn đề về học phí, tôi nên chọn ưu tiên nào?"
- "Vấn đề học phí nên chọn ưu tiên cao hay trung bình?"
`
        },
        {
            id: "doc-ticket-status",
            title: "Trạng thái của Ticket và ý nghĩa",
            content: `
# Các Trạng thái của Ticket trong hệ thống và ý nghĩa

Ticket sẽ thay đổi trạng thái trong suốt quá trình từ khi tạo ra đến khi được giải quyết, giúp người dùng và nhân viên dễ dàng theo dõi tiến độ.

## 1. Mới (New)
- **Ý nghĩa**: Ticket vừa được tạo thành công và đang chờ được tiếp nhận/phân công.
- **Ai nhìn thấy**: Người tạo ticket, Quản lý, Admin.
- **Hành động tiếp theo**: Thường sẽ được Quản lý phân công hoặc Nhân viên nhận.
- **Tìm kiếm liên quan**: Trạng thái mới là gì? Ticket mới có nghĩa là gì?

## 2. Đang xử lý (In Progress)
- **Ý nghĩa**: Ticket đã được một Nhân viên (Employee) tiếp nhận và đang trong quá trình giải quyết vấn đề hoặc thực hiện yêu cầu.
- **Ai nhìn thấy**: Người tạo ticket, Nhân viên xử lý, Quản lý, Admin.
- **Hành động tiếp theo**: Nhân viên xử lý sẽ tiếp tục cập nhật, yêu cầu thêm thông tin nếu cần.
- **Tìm kiếm liên quan**: Ticket đang xử lý nghĩa là gì? Khi nào ticket có trạng thái đang xử lý? Ticket của tôi đang ở trạng thái 'Đang xử lý' có nghĩa là gì?

## 3. Chờ phản hồi (Pending Reply)
- **Ý nghĩa**: Ticket đang tạm dừng xử lý do Nhân viên đang chờ thông tin bổ sung, xác nhận từ Người yêu cầu (User) hoặc một bên thứ ba.
- **Ai nhìn thấy**: Người tạo ticket, Nhân viên xử lý, Quản lý, Admin.
- **Hành động tiếp theo**: Người yêu cầu cần cung cấp thông tin để ticket tiếp tục được xử lý.
- **Tìm kiếm liên quan**: Ticket chờ phản hồi là gì? Tại sao ticket lại chờ phản hồi? Khi ticket chuyển sang 'Chờ phản hồi', tôi cần làm gì?

## 4. Đã hoàn thành (Resolved)
- **Ý nghĩa**: Vấn đề đã được giải quyết hoặc yêu cầu đã được đáp ứng bởi Nhân viên. Ticket chờ Người yêu cầu xác nhận hoặc sẽ tự động chuyển sang "Đã đóng" sau một khoảng thời gian nhất định.
- **Ai nhìn thấy**: Người tạo ticket, Nhân viên xử lý, Quản lý, Admin.
- **Hành động tiếp theo**: Người yêu cầu đánh giá và đóng ticket.
- **Tìm kiếm liên quan**: Ticket đã hoàn thành nghĩa là gì? Vấn đề đã giải quyết thì trạng thái là gì? Khi ticket của tôi được 'Đã hoàn thành', tôi có cần làm gì nữa không?

## 5. Đã hủy (Canceled)
- **Ý nghĩa**: Ticket đã bị hủy bởi người tạo ticket hoặc Admin trước khi nó được xử lý.
- **Ai nhìn thấy**: Người tạo ticket, Admin.
- **Lưu ý**: Ticket này sẽ không được xử lý tiếp.
- **Tìm kiếm liên quan**: Ticket đã hủy nghĩa là gì? Khi nào ticket bị hủy? Làm sao để hủy một yêu cầu mà tôi đã gửi?

❓ **Gợi ý tìm kiếm chung**:
- "Trạng thái ticket mới nghĩa là gì?"
- "Khi nào thì ticket là đang xử lý?"
- "Sự khác biệt giữa đã hoàn thành và đã đóng?"
- "Ticket chờ phản hồi là sao?"
- "Các trạng thái của một yêu cầu?"
`
        },
        {
            id: "doc-ticket-categories",
            title: "Các loại Danh mục Ticket và phạm vi hỗ trợ",
            content: `
# Các Danh mục Ticket trong hệ thống và phòng ban phụ trách

Hệ thống phân loại ticket thành nhiều danh mục để dễ dàng định tuyến và xử lý hiệu quả. Dưới đây là các danh mục chính và phòng ban thường phụ trách.

## Để gửi yêu cầu về [Vấn đề], bạn nên chọn [Danh mục Ticket] và nó thường do [Phòng ban] phụ trách.

## 1. Liên quan đến Sinh viên & Chính sách
- **Các vấn đề liên quan**: Miễn giảm học phí, Chính sách đãi ngộ, Ký túc xá, Bảo hiểm, Hỗ trợ đời sống cán bộ.
- **Danh mục Ticket phù hợp**:
    - **Học vụ - Sinh viên**: Dùng cho các vấn đề học tập, chính sách trực tiếp ảnh hưởng đến sinh viên.
    - **Chính sách**: Dùng cho các vấn đề liên quan đến quy định, quyền lợi, ưu đãi.
    - **Đời sống**: Dùng cho các vấn đề về chỗ ở, bảo hiểm, hỗ trợ cá nhân.
- **Phòng ban phụ trách**: Thường do **Phòng Công tác Sinh viên** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Miễn giảm học phí thuộc danh mục nào?"
    - Trả lời: "Miễn giảm học phí thuộc danh mục **Học vụ - Sinh viên** hoặc **Chính sách**. Yêu cầu này thường do **Phòng Công tác Sinh viên** phụ trách."
    - Hỏi: "Vấn đề ký túc xá thì chọn danh mục nào?"
    - Trả lời: "Vấn đề ký túc xá thuộc danh mục **Đời sống Sinh viên**. Yêu cầu này thường do **Phòng Công tác Sinh viên** phụ trách."
    - Hỏi: "Tôi muốn gửi yêu cầu về việc miễn giảm học phí thì chọn danh mục nào?"
    - Trả lời: "Đối với yêu cầu về miễn giảm học phí, bạn nên chọn danh mục **Học vụ - Sinh viên** hoặc **Chính sách**. Yêu cầu này thường do **Phòng Công tác Sinh viên** phụ trách."

## 2. Liên quan đến Hành chính - Nhân sự
- **Các vấn đề liên quan**: Cấp giấy tờ (các loại xác nhận, chứng nhận, sao y), Nhân sự (đơn từ nhân sự, thông tin cá nhân, quy định).
- **Danh mục Ticket phù hợp**:
    - **Hành chính - Giấy tờ**: Dùng cho các yêu cầu về giấy tờ, chứng nhận.
    - **Nhân sự**: Dùng cho các vấn đề liên quan đến thông tin, quy định, đơn từ nhân sự.
- **Phòng ban phụ trách**: Thường do **Phòng Hành chính - Tổng hợp** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Cấp giấy tờ thuộc danh mục nào?"
    - Trả lời: "Yêu cầu cấp giấy tờ thuộc danh mục **Hành chính - Giấy tờ**. Phòng **Hành chính - Tổng hợp** sẽ tiếp nhận yêu cầu của bạn."
    - Hỏi: "Tôi cần cấp giấy tờ thì chọn danh mục nào?"
    - Trả lời: "Để yêu cầu cấp giấy tờ, bạn hãy chọn danh mục **Hành chính - Giấy tờ**. Phòng **Hành chính - Tổng hợp** sẽ tiếp nhận yêu cầu của bạn."

## 3. Liên quan đến Học vụ
- **Các vấn đề liên quan**: Đăng ký học, Điểm số, Lịch thi, Chương trình học, Tốt nghiệp.
- **Danh mục Ticket phù hợp**: **Học vụ**.
- **Phòng ban phụ trách**: Thường do **Phòng Đào tạo** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Lịch thi thuộc danh mục nào?"
    - Trả lời: "Lịch thi thuộc danh mục **Học vụ**. Yêu cầu này do **Phòng Đào tạo** phụ trách."
    - Hỏi: "Tôi muốn hỏi về lịch thi hoặc điểm số thì chọn danh mục nào?"
    - Trả lời: "Đối với các vấn đề về lịch thi hoặc điểm số, bạn nên chọn danh mục **Học vụ**. Yêu cầu của bạn sẽ được **Phòng Đào tạo** xử lý."

## 4. Liên quan đến Công nghệ thông tin (IT)
- **Các vấn đề liên quan**: Xử lý lỗi hệ thống, Hỗ trợ CNTT chung, Hỗ trợ phần mềm, Mạng nội bộ, Quản lý máy chủ, An toàn dữ liệu.
- **Danh mục Ticket phù hợp**:
    - **IT - Hệ thống**: Dùng cho lỗi hệ thống, ứng dụng chung.
    - **IT - Phần mềm**: Dùng cho cài đặt, lỗi phần mềm cụ thể.
    - **IT - Mạng**: Dùng cho sự cố kết nối mạng.
    - **IT - Phần cứng**: Dùng cho các vấn đề về thiết bị phần cứng.
    - **Bảo mật thông tin**: Dùng cho vấn đề an toàn dữ liệu.
- **Phòng ban phụ trách**: Thường do **Phòng Kỹ thuật, IT (CNTT)** hoặc **Tổ CNTT** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Lỗi phần mềm thuộc danh mục nào?"
    - Trả lời: "Lỗi phần mềm thuộc danh mục **IT - Phần mềm**. Phòng **Kỹ thuật, IT (CNTT)** sẽ hỗ trợ bạn."
    - Hỏi: "Tôi muốn sửa máy tính thì chọn danh mục gì?"
    - Trả lời: "Để yêu cầu sửa chữa máy tính, bạn hãy chọn danh mục **IT - Phần cứng** hoặc **Hỗ trợ CNTT chung**. Yêu cầu này sẽ được xử lý bởi **Phòng Kỹ thuật, IT (CNTT)**."

## 5. Liên quan đến Tài chính
- **Các vấn đề liên quan**: Học phí, Học bổng, Thu chi.
- **Danh mục Ticket phù hợp**:
    - **Tài chính - Kế hoạch**: Dùng cho các vấn đề thu chi chung.
    - **Học phí**: Dùng cho các vấn đề thanh toán, nợ học phí.
    - **Học bổng**: Dùng cho thông tin và quy trình học bổng.
- **Phòng ban phụ trách**: Thường do **Phòng Kế hoạch - Tài chính** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Học phí thuộc danh mục nào?"
    - Trả lời: "Học phí thuộc danh mục **Học phí**. Vấn đề này do **Phòng Kế hoạch - Tài chính** phụ trách."
    - Hỏi: "Tôi muốn biết về học bổng thì chọn danh mục nào?"
    - Trả lời: "Thông tin về học bổng thuộc danh mục **Học bổng**. Vấn đề này do **Phòng Kế hoạch - Tài chính** phụ trách."
    - Hỏi: "Phòng ban nào xử lý vấn đề về học phí?"
    - Trả lời: "Phòng **Kế hoạch - Tài chính** xử lý các vấn đề liên quan đến học phí."

## 6. Liên quan đến Đảm bảo Chất lượng
- **Các vấn đề liên quan**: Giám sát thi cử, Đánh giá chất lượng.
- **Danh mục Ticket phù hợp**: **Khảo thí**, **Đảm bảo chất lượng**.
- **Phòng ban phụ trách**: Thường do **Phòng Khảo thí & Đảm bảo Chất lượng** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Giám sát thi cử thuộc danh mục nào?"
    - Trả lời: "Giám sát thi cử thuộc danh mục **Khảo thí**. Yêu cầu này do **Phòng Khảo thí & Đảm bảo Chất lượng** phụ trách."

## 7. Liên quan đến Khiếu nại - Pháp chế
- **Các vấn đề liên quan**: Khiếu nại, Tố cáo, Giám sát nội quy.
- **Danh mục Ticket phù hợp**: **Khiếu nại - Tố cáo**, **Pháp chế**.
- **Phòng ban phụ trách**: Thường do **Phòng Thanh tra - Pháp chế** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Khiếu nại thuộc danh mục nào?"
    - Trả lời: "Các vấn đề khiếu nại thuộc danh mục **Khiếu nại - Tố cáo**. Phòng **Thanh tra - Pháp chế** sẽ tiếp nhận."

## 8. Liên quan đến Cơ sở Vật chất
- **Các vấn đề liên quan**: Sửa chữa phòng học, Thiết bị giảng dạy (bàn ghế, máy chiếu, điều hòa, điện nước).
- **Danh mục Ticket phù hợp**: **Cơ sở Vật chất - Thiết bị**, **Sửa chữa**.
- **Phòng ban phụ trách**: Thường do **Phòng Cơ sở Vật chất** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Sửa chữa máy chiếu thuộc danh mục nào?"
    - Trả lời: "Sửa chữa máy chiếu thuộc danh mục **Cơ sở Vật chất - Thiết bị** hoặc **Sửa chữa**. Yêu cầu này do **Phòng Cơ sở Vật chất** phụ trách."
    - Hỏi: "Tôi muốn sửa máy chiếu trong phòng học thì chọn danh mục gì?"
    - Trả lời: "Bạn nên chọn danh mục **Cơ sở Vật chất - Thiết bị** hoặc **Sửa chữa** khi muốn yêu cầu sửa máy chiếu trong phòng học. **Phòng Cơ sở Vật chất** sẽ xử lý yêu cầu này."

## 9. Liên quan đến Hỗ trợ Việc làm & Kỹ năng
- **Các vấn đề liên quan**: Việc làm, Kỹ năng mềm.
- **Danh mục Ticket phù hợp**: **Việc làm - Tuyển dụng**, **Kỹ năng mềm**.
- **Phòng ban phụ trách**: Thường do **Trung tâm Hỗ trợ Sinh viên & Quan hệ Doanh nghiệp** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Vấn đề việc làm thuộc danh mục nào?"
    - Trả lời: "Vấn đề việc làm thuộc danh mục **Việc làm - Tuyển dụng**. Trung tâm **Hỗ trợ Sinh viên & Quan hệ Doanh nghiệp** phụ trách."

## 10. Liên quan đến Hoạt động Đoàn thể
- **Các vấn đề liên quan**: Hoạt động ngoại khóa, Tình nguyện, Câu lạc bộ.
- **Danh mục Ticket phù hợp**: **Đoàn thể - Sinh viên**, **Hoạt động ngoại khóa**.
- **Phòng ban phụ trách**: Thường do **Đoàn Thanh niên, Hội Sinh viên** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Hoạt động ngoại khóa thuộc danh mục nào?"
    - Trả lời: "Hoạt động ngoại khóa thuộc danh mục **Đoàn thể - Sinh viên** hoặc **Hoạt động ngoại khóa**. Yêu cầu này do **Đoàn Thanh niên, Hội Sinh viên** phụ trách."

## 11. Liên quan đến Đề tài Nghiên cứu
- **Các vấn đề liên quan**: Xác nhận học phần (liên quan đến nghiên cứu, đồ án), Xét duyệt đề tài nghiên cứu.
- **Danh mục Ticket phù hợp**: **Nghiên cứu khoa học**, **Học phần - Đồ án**.
- **Phòng ban phụ trách**: Thường do **Các khoa chuyên ngành** phụ trách.
- **Gợi ý hỏi & trả lời**:
    - Hỏi: "Xét duyệt đề tài nghiên cứu thuộc danh mục nào?"
    - Trả lời: "Xét duyệt đề tài nghiên cứu thuộc danh mục **Nghiên cứu khoa học**. Yêu cầu này do **Các khoa chuyên ngành** phụ trách."

❓ **Gợi ý tìm kiếm chung**:
- "Danh mục học phí thuộc phòng nào?"
- "Tôi muốn sửa máy tính thì chọn danh mục gì?"
- "Các loại yêu cầu về hành chính?"
- "Danh mục khiếu nại là gì?"
- "Phòng Công tác Sinh viên phụ trách những gì?"
- "Loại ticket về bảo mật dữ liệu?"
- "Tôi muốn gửi yêu cầu về [vấn đề cụ thể] thì chọn danh mục nào?"
- "Tôi cần cấp giấy tờ thì chọn danh mục nào?"
- "Tôi muốn hỏi về lịch thi hoặc điểm số thì chọn danh mục nào?"
- "Tôi bị lỗi phần mềm thì chọn danh mục gì?"
- "Tôi muốn biết về học bổng thì chọn danh mục nào?"
- "Tôi muốn sửa máy chiếu trong phòng học thì chọn danh mục gì?"
- "Miễn giảm học phí thuộc danh mục nào?"
- "Ký túc xá thuộc danh mục nào?"
- "Cấp giấy tờ thuộc danh mục nào?"
- "Lỗi phần mềm thuộc danh mục nào?"
- "Học phí thuộc danh mục nào?"
- "Lịch thi thuộc danh mục nào?"
- "Khiếu nại thuộc danh mục nào?"
- "Sửa chữa máy chiếu thuộc danh mục nào?"
- "Vấn đề việc làm thuộc danh mục nào?"
- "Hoạt động ngoại khóa thuộc danh mục nào?"
- "Xét duyệt đề tài nghiên cứu thuộc danh mục nào?"
`
        },
        {
            id: "doc-reports-statistics",
            title: "Các loại Báo cáo và Thống kê trong Hệ thống",
            content: `
# Các loại Báo cáo và Thống kê sẵn có trong Hệ thống Ticket System

Hệ thống cung cấp các báo cáo và thống kê đa dạng, giúp người quản lý và Admin có cái nhìn tổng quan và chi tiết về hiệu suất hoạt động, tình hình xử lý yêu cầu.

## 1. Báo cáo tổng quan Ticket
Cung cấp cái nhìn tổng thể về số lượng và phân bổ các ticket.
- **Số lượng Ticket theo trạng thái**: Thống kê số lượng ticket đang ở trạng thái Mới, Đang xử lý, Đã hoàn thành, Đã đóng, Đã hủy.
- **Số lượng Ticket theo danh mục**: Phân tích các loại yêu cầu nào được gửi nhiều nhất (ví dụ: IT, Hành chính, Học vụ).
- **Số lượng Ticket theo phòng ban**: Thể hiện số lượng ticket đến từng phòng ban cụ thể.
- **Số lượng Ticket theo mức độ ưu tiên**: Phân tích số lượng ticket ở các mức Khẩn cấp, Cao, Trung bình, Thấp.
- **Biểu đồ xu hướng Ticket**: Trực quan hóa số lượng ticket tạo mới theo thời gian (ngày, tuần, tháng), giúp nhận diện các giai đoạn cao điểm hoặc bất thường.
- **Tìm kiếm liên quan**: Báo cáo trạng thái ticket, thống kê ticket theo danh mục, biểu đồ ticket.

## 2. Báo cáo hiệu suất xử lý
Đánh giá hiệu quả làm việc của đội ngũ hỗ trợ.
- **Thời gian phản hồi trung bình (Average Response Time)**: Thời gian trung bình từ khi ticket được tạo đến khi có phản hồi đầu tiên từ nhân viên.
- **Thời gian giải quyết trung bình (Average Resolution Time)**: Thời gian trung bình từ khi ticket được tạo đến khi nó được đánh dấu là "Đã hoàn thành".
- **Hiệu suất theo nhân viên/phòng ban**: Thống kê số lượng ticket được xử lý bởi mỗi nhân viên hoặc phòng ban, và thời gian giải quyết trung bình của họ.
- **Tỷ lệ hoàn thành đúng hạn (SLA Compliance Rate)**: Phần trăm các ticket được giải quyết trong khung thời gian quy định theo mức độ ưu tiên (SLA).
- **Tìm kiếm liên quan**: Báo cáo thời gian xử lý, hiệu suất nhân viên, SLA, thời gian phản hồi trung bình. Tôi muốn xem báo cáo hiệu suất nhân viên. Hệ thống có báo cáo về thời gian xử lý ticket không?

## 3. Báo cáo phản hồi và hài lòng
Đo lường mức độ hài lòng của người dùng.
- **Điểm hài lòng trung bình (Average Satisfaction Score)**: Tổng hợp điểm đánh giá từ người dùng sau khi ticket được xử lý.
- **Phân tích phản hồi**: Thống kê các nhận xét, lý do tích cực hoặc tiêu cực từ phản hồi của người dùng.
- **Tìm kiếm liên quan**: Báo cáo hài lòng khách hàng, điểm đánh giá, khảo sát phản hồi. Báo cáo về mức độ hài lòng của khách hàng?

## 4. Báo cáo quản lý tài nguyên
Giúp phân bổ và tối ưu hóa nguồn lực.
- **Phân bổ workload**: Thống kê số lượng ticket hiện tại mà mỗi nhân viên hoặc phòng ban đang xử lý.
- **Danh sách Ticket chưa được phân công**: Liệt kê các ticket mới đang chờ được gán cho nhân viên xử lý.
- **Tìm kiếm liên quan**: Báo cáo phân bổ công việc, ticket chưa gán.

## 5. Báo cáo chi tiết các trường hợp đặc biệt
- **Danh sách Ticket quá hạn (Overdue Tickets)**: Liệt kê các ticket chưa được giải quyết trong thời gian quy định.
- **Ticket chưa được phản hồi (Unresponded Tickets)**: Các ticket đã được tạo nhưng chưa nhận được bất kỳ phản hồi nào từ nhân viên.
- **Tìm kiếm liên quan**: Ticket quá hạn, ticket chưa phản hồi. Làm sao để biết ticket nào đang bị quá hạn?

❓ **Gợi ý tìm kiếm chung**:
- "Tôi muốn xem báo cáo hiệu suất nhân viên."
- "Hệ thống có báo cáo về thời gian xử lý ticket không?"
- "Xem thống kê ticket theo phòng ban?"
- "Các loại báo cáo có sẵn?"
- "Báo cáo về mức độ hài lòng của khách hàng?"
- "Làm sao để biết ticket nào đang bị quá hạn?"
- "Có báo cáo nào về sự hài lòng của người dùng đối với dịch vụ của phòng tôi không?"
- "Tôi muốn xem những ticket nào đang bị quá hạn trong phòng tôi."
- "Làm cách nào để truy cập báo cáo về thời gian phản hồi trung bình của phòng tôi?"
`
        },
    ]
};