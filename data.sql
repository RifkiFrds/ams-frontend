-- ===============================
    -- MASTER DATA
    -- ===============================

    CREATE TABLE units (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama_unit VARCHAR(150) NOT NULL,
        parent_unit_id BIGINT,
        kode_unit VARCHAR(50),
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        CONSTRAINT fk_units_parent
            FOREIGN KEY (parent_unit_id) REFERENCES units(id)
    );

    CREATE TABLE roles (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama_role VARCHAR(100) NOT NULL,
        deskripsi TEXT
    );

    CREATE TABLE users (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama_lengkap VARCHAR(150) NOT NULL,
        nrp VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        unit_id BIGINT,
        jabatan VARCHAR(100),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        CONSTRAINT fk_users_unit
            FOREIGN KEY (unit_id) REFERENCES units(id)
    );

    CREATE TABLE user_roles (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT NOT NULL,
        role_id BIGINT NOT NULL,
        CONSTRAINT fk_user_roles_user
            FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT fk_user_roles_role
            FOREIGN KEY (role_id) REFERENCES roles(id)
    );

    CREATE TABLE locations (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama_gedung VARCHAR(150),
        lantai VARCHAR(20),
        ruangan VARCHAR(100),
        kode_lokasi VARCHAR(50),
        unit_id BIGINT,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        CONSTRAINT fk_locations_unit
            FOREIGN KEY (unit_id) REFERENCES units(id)
    );

    CREATE TABLE asset_categories (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        kode_kategori VARCHAR(50),
        nama_kategori VARCHAR(150),
    );

    -- ===============================
    -- PROCUREMENT
    -- ===============================

    CREATE TABLE procurements (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nomor_pengadaan VARCHAR(100) UNIQUE,
        vendor VARCHAR(150),
        nomor_kontrak VARCHAR(100),
        tanggal_pengadaan DATE,
        total_nilai DECIMAL(18,2),
        dokumen_path VARCHAR(255),
        created_by BIGINT,
        created_at TIMESTAMP NULL,
        CONSTRAINT fk_procurements_user
            FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE procurement_items (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        procurement_id BIGINT,
        nama_barang VARCHAR(150),
        quantity INT,
        harga_satuan DECIMAL(18,2),
        total_harga DECIMAL(18,2),
        CONSTRAINT fk_procurement_items_procurement
            FOREIGN KEY (procurement_id) REFERENCES procurements(id)
    );

    -- ===============================
    -- ASSET
    -- ===============================

    CREATE TABLE assets (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        kode_barang VARCHAR(50),
        nomor_register VARCHAR(50) UNIQUE,
        nama_barang VARCHAR(150),
        merk VARCHAR(100), // baru
        kategori_id BIGINT,
        procurement_item_id BIGINT,
        nilai_perolehan DECIMAL(18,2),
        sumber_dana VARCHAR(100),
        
        tahun_perolehan YEAR,
        klasifikasi ENUM('intrakomptabel','ekstrakomptabel'),
        kondisi ENUM('baik','rusak_ringan','rusak_berat'),
        status_penggunaan ENUM('aktif','dipinjam','maintenance','dihapus','hilang'),
        lokasi_id BIGINT,
        unit_id BIGINT,
        penanggung_jawab_id BIGINT,
        qr_code_path VARCHAR(255),
        gambar_path VARCHAR(255),
        created_by BIGINT,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,

        CONSTRAINT fk_assets_kategori
            FOREIGN KEY (kategori_id) REFERENCES asset_categories(id),

        CONSTRAINT fk_assets_procurement
            FOREIGN KEY (procurement_item_id) REFERENCES procurement_items(id),

        CONSTRAINT fk_assets_lokasi
            FOREIGN KEY (lokasi_id) REFERENCES locations(id),

        CONSTRAINT fk_assets_unit
            FOREIGN KEY (unit_id) REFERENCES units(id),

        CONSTRAINT fk_assets_user
            FOREIGN KEY (penanggung_jawab_id) REFERENCES users(id),

        CONSTRAINT fk_assets_created_by
            FOREIGN KEY (created_by) REFERENCES users(id)
    );

    CREATE TABLE asset_documents (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        nama_dokumen VARCHAR(150),
        file_path VARCHAR(255),
        jenis_dokumen VARCHAR(100),
        uploaded_at TIMESTAMP NULL,
        CONSTRAINT fk_asset_documents_asset
            FOREIGN KEY (asset_id) REFERENCES assets(id)
    );

    CREATE TABLE asset_assignments (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        user_id BIGINT,
        unit_id BIGINT,
        assigned_at DATETIME,
        returned_at DATETIME,
        assigned_by BIGINT,
        notes TEXT,

        CONSTRAINT fk_assignment_asset
            FOREIGN KEY (asset_id) REFERENCES assets(id),

        CONSTRAINT fk_assignment_user
            FOREIGN KEY (user_id) REFERENCES users(id),

        CONSTRAINT fk_assignment_unit
            FOREIGN KEY (unit_id) REFERENCES units(id)
    );

    CREATE TABLE asset_status_history (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        old_status VARCHAR(50),
        new_status VARCHAR(50),
        changed_by BIGINT,
        changed_at DATETIME,
        notes TEXT,

        CONSTRAINT fk_status_asset
            FOREIGN KEY (asset_id) REFERENCES assets(id),

        CONSTRAINT fk_status_user
            FOREIGN KEY (changed_by) REFERENCES users(id)
    );

    CREATE TABLE asset_depreciations (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        umur_manfaat INT,
        nilai_penyusutan_per_tahun DECIMAL(18,2),
        akumulasi_penyusutan DECIMAL(18,2),
        nilai_buku DECIMAL(18,2),
        tahun YEAR,
        created_at TIMESTAMP NULL,
        CONSTRAINT fk_asset_depreciations_asset
            FOREIGN KEY (asset_id) REFERENCES assets(id)
    );

    -- ===============================
    -- WORKFLOW
    -- ===============================

    CREATE TABLE workflows (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        nama_workflow VARCHAR(150),
        entity_type VARCHAR(100)
    );

    CREATE TABLE workflow_steps (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        workflow_id BIGINT,
        step_order INT,
        role_id BIGINT,
        nama_step VARCHAR(100),

        CONSTRAINT fk_workflow_steps_workflow
            FOREIGN KEY (workflow_id) REFERENCES workflows(id),

        CONSTRAINT fk_workflow_steps_role
            FOREIGN KEY (role_id) REFERENCES roles(id)
    );

    CREATE TABLE workflow_instances (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        workflow_id BIGINT,
        entity_type VARCHAR(100),
        entity_id BIGINT,
        status VARCHAR(50),
        started_by BIGINT,
        started_at DATETIME,
        completed_at DATETIME,

        CONSTRAINT fk_workflow_instances_workflow
            FOREIGN KEY (workflow_id) REFERENCES workflows(id),

        CONSTRAINT fk_workflow_instances_user
            FOREIGN KEY (started_by) REFERENCES users(id)
    );

    CREATE TABLE workflow_approvals (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        workflow_instance_id BIGINT,
        step_id BIGINT,
        approver_id BIGINT,
        status VARCHAR(50),
        approved_at DATETIME,
        notes TEXT,

        CONSTRAINT fk_workflow_approvals_instance
            FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id),

        CONSTRAINT fk_workflow_approvals_step
            FOREIGN KEY (step_id) REFERENCES workflow_steps(id),

        CONSTRAINT fk_workflow_approvals_user
            FOREIGN KEY (approver_id) REFERENCES users(id)
    );

    -- ===============================
    -- TRANSACTION
    -- ===============================

    CREATE TABLE asset_transfers (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        dari_unit_id BIGINT,
        ke_unit_id BIGINT,
        dari_lokasi_id BIGINT,
        ke_lokasi_id BIGINT,
        dari_user_id BIGINT,
        ke_user_id BIGINT,
        workflow_instance_id BIGINT,
        tanggal_transfer DATE,
        berita_acara_path VARCHAR(255),
        created_at TIMESTAMP NULL,

        FOREIGN KEY (asset_id) REFERENCES assets(id),
        FOREIGN KEY (dari_unit_id) REFERENCES units(id),
        FOREIGN KEY (ke_unit_id) REFERENCES units(id),
        FOREIGN KEY (dari_lokasi_id) REFERENCES locations(id),
        FOREIGN KEY (ke_lokasi_id) REFERENCES locations(id),
        FOREIGN KEY (dari_user_id) REFERENCES users(id),
        FOREIGN KEY (ke_user_id) REFERENCES users(id),
        FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id)
    );

    CREATE TABLE asset_loans (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        peminjam_id BIGINT,
        approver_id BIGINT,
        workflow_instance_id BIGINT,
        tanggal_pinjam DATE,
        tanggal_rencana_kembali DATE,
        tanggal_kembali DATE,
        foto_sebelum VARCHAR(255),
        foto_sesudah VARCHAR(255),
        status ENUM('menunggu','disetujui','ditolak','dipinjam','selesai','terlambat'),
        created_at TIMESTAMP NULL,

        FOREIGN KEY (asset_id) REFERENCES assets(id),
        FOREIGN KEY (peminjam_id) REFERENCES users(id),
        FOREIGN KEY (approver_id) REFERENCES users(id),
        FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id)
    );

    CREATE TABLE loan_documents (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        loan_id BIGINT,
        jenis_dokumen VARCHAR(100),
        file_path VARCHAR(255),
        uploaded_at TIMESTAMP NULL,
        FOREIGN KEY (loan_id) REFERENCES asset_loans(id)
    );

    CREATE TABLE maintenance_records (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        jenis_perawatan VARCHAR(150),
        deskripsi TEXT,
        estimasi_biaya DECIMAL(18,2),
        vendor VARCHAR(150),
        tanggal_mulai DATE,
        tanggal_selesai DATE,
        kondisi_setelah ENUM('baik','rusak_ringan','rusak_berat'),
        created_at TIMESTAMP NULL,
        FOREIGN KEY (asset_id) REFERENCES assets(id)
    );

    CREATE TABLE asset_disposals (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        workflow_instance_id BIGINT,
        alasan_penghapusan TEXT,
        dokumen_path VARCHAR(255),
        tanggal_penghapusan DATE,
        created_at TIMESTAMP NULL,
        FOREIGN KEY (asset_id) REFERENCES assets(id),
        FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id)
    );

    CREATE TABLE inventories (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        tanggal_mulai DATE,
        tanggal_selesai DATE,
        unit_id BIGINT,
        berita_acara_path VARCHAR(255),
        created_at TIMESTAMP NULL,
        FOREIGN KEY (unit_id) REFERENCES units(id)
    );

    CREATE TABLE inventory_details (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        inventory_id BIGINT,
        asset_id BIGINT,
        status_fisik ENUM('sesuai','tidak_ditemukan','rusak'),
        keterangan TEXT,
        FOREIGN KEY (inventory_id) REFERENCES inventories(id),
        FOREIGN KEY (asset_id) REFERENCES assets(id)
    );

    CREATE TABLE loss_reports (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        asset_id BIGINT,
        pelapor_id BIGINT,
        workflow_instance_id BIGINT,
        kronologi TEXT,
        dokumen_path VARCHAR(255),
        status_proses ENUM('lapor','proses_tgr','selesai'),
        created_at TIMESTAMP NULL,

        FOREIGN KEY (asset_id) REFERENCES assets(id),
        FOREIGN KEY (pelapor_id) REFERENCES users(id),
        FOREIGN KEY (workflow_instance_id) REFERENCES workflow_instances(id)
    );

    -- ===============================
    -- SUPPORT
    -- ===============================

    CREATE TABLE notifications (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT,
        title VARCHAR(150),
        message TEXT,
        entity_type VARCHAR(100),
        entity_id BIGINT,
        is_read BOOLEAN DEFAULT FALSE,
        created_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE audit_logs (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT,
        aktivitas VARCHAR(255),
        tabel_terkait VARCHAR(100),
        data_id BIGINT,
        waktu TIMESTAMP,
        ip_address VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );