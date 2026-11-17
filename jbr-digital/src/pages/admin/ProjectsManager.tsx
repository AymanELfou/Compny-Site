import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import ImageIcon from '@mui/icons-material/Image';
import LaunchIcon from '@mui/icons-material/Launch';
import { useProjects } from '../../hooks/useProjects';
import api from '../../lib/api';
import type { Project } from '../../types/admin';

export const ProjectsManager: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Filters state
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Web');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Category types list
  const categoriesList = [
    { id: 'All', labelEn: 'All Types', labelAr: 'جميع الأنواع' },
    { id: 'Web', labelEn: 'Websites', labelAr: 'مواقع الويب' },
    { id: 'Mobile', labelEn: 'Mobile Apps', labelAr: 'تطبيقات الجوال' },
    { id: 'E-Commerce', labelEn: 'E-Commerce', labelAr: 'متاجر إلكترونية' },
    { id: 'AI', labelEn: 'AI & Automation', labelAr: 'ذكاء اصطناعي' },
    { id: 'ERP', labelEn: 'ERP Systems', labelAr: 'أنظمة ERP' },
  ];

  const statusList = [
    { id: 'all', labelEn: 'All Status', labelAr: 'جميع الحالات' },
    { id: 'active', labelEn: 'Active Only', labelAr: 'المشاريع النشطة' },
    { id: 'inactive', labelEn: 'Inactive Only', labelAr: 'المشاريع المعطلة' },
  ];

  // Filter projects based on category and active/inactive status
  const filteredProjects = projects.filter((project) => {
    // Type Filter
    if (selectedType !== 'All') {
      const pCat = project.category?.toLowerCase() || '';
      const sCat = selectedType.toLowerCase();
      if (pCat !== sCat && !pCat.includes(sCat) && !sCat.includes(pCat)) {
        return false;
      }
    }
    // Status Filter
    if (selectedStatus === 'active' && !project.is_active) return false;
    if (selectedStatus === 'inactive' && project.is_active) return false;
    return true;
  });

  const openCreateModal = () => {
    setEditingProject(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImagePreview('');
    setSelectedFileName('');
    setUploadError(null);
    setLink('');
    setCategory('Web');
    setIsActive(true);
    setIsFeatured(false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setTitle(project.title || '');
    setDescription(project.description || '');
    setImageUrl(project.image_url || '');
    setImagePreview(project.image_url || '');
    setSelectedFileName('');
    setUploadError(null);
    const existingLink = project.link || (Array.isArray(project.tags) && project.tags[0]?.startsWith('http') ? project.tags[0] : '');
    setLink(existingLink);
    setCategory(project.category || 'Web');
    setIsActive(project.is_active ?? true);
    setIsFeatured(project.is_featured ?? false);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Handle file selection and upload
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setSelectedFileName(file.name);
    setUploadingImage(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data?.url) {
        setImageUrl(response.data.url);
      }
    } catch {
      // In offline/local mode, convert to base64 Data URL so the image displays perfectly
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleClearImage = () => {
    setImageUrl('');
    setImagePreview('');
    setSelectedFileName('');
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadingImage) {
      alert(isRTL ? 'يرجى الانتظار حتى اكتمال رفع الصورة' : 'Please wait until image upload finishes');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    const cleanedLink = link.trim();
    const formattedLink = cleanedLink && !/^https?:\/\//i.test(cleanedLink) ? `https://${cleanedLink}` : cleanedLink;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      image_url: imageUrl,
      link: formattedLink,
      tags: formattedLink ? [formattedLink] : [],
      price: 0,
      category: category.trim() || 'Web',
      is_active: isActive,
      is_featured: isFeatured,
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Error saving project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id);
      setDeleteConfirmId(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting project');
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header section ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isRTL ? 'إدارة المشاريع والأسعار' : 'Projects & Pricing Manager'}
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {isRTL
              ? 'إضافة وتعديل وحذف مشاريع الوكالة وتحديد أسعارها في الموقع والمساعد الذكي'
              : 'Add, update or delete projects and configure live pricing shown on site and to AI'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchProjects()}
            disabled={loading}
            title={isRTL ? 'تحديث' : 'Refresh'}
            className="p-2.5 rounded-xl border border-zinc-700 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshIcon className={loading ? 'animate-spin' : ''} fontSize="small" />
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0055FF, #00A3FF)',
            }}
          >
            <AddIcon fontSize="small" />
            <span>{isRTL ? 'إضافة مشروع جديد' : 'New Project'}</span>
          </button>
        </div>
      </div>

      {/* ── Filters Bar (Type & Status) ── */}
      <div
        className="p-4 rounded-2xl border space-y-3"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
          <FilterListIcon fontSize="small" style={{ color: 'var(--electric-blue)' }} />
          <span>{isRTL ? 'تصفية وتحديد العرض:' : 'Filter & Search:'}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          {/* Project Type Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-zinc-400 mr-1 font-medium">
              {isRTL ? 'نوع المشروع:' : 'Type:'}
            </span>
            {categoriesList.map((cat) => {
              const isSelected = selectedType === cat.id;
              const count =
                cat.id === 'All'
                  ? projects.length
                  : projects.filter((p) => {
                      const pCat = p.category?.toLowerCase() || '';
                      const sCat = cat.id.toLowerCase();
                      return pCat === sCat || pCat.includes(sCat) || sCat.includes(pCat);
                    }).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedType(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{isRTL ? cat.labelAr : cat.labelEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Status Filter (Active / Inactive) */}
          <div className="flex items-center gap-1.5 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
            <span className="text-xs text-zinc-400 mr-1 font-medium">
              {isRTL ? 'الحالة:' : 'Status:'}
            </span>
            {statusList.map((st) => {
              const isSelected = selectedStatus === st.id;
              const count =
                st.id === 'all'
                  ? projects.length
                  : st.id === 'active'
                  ? projects.filter((p) => p.is_active).length
                  : projects.filter((p) => !p.is_active).length;

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedStatus(st.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{isRTL ? st.labelAr : st.labelEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl text-sm border bg-red-500/10 border-red-500/30 text-red-400">
          {error}
        </div>
      )}

      {/* ── Projects Grid ── */}
      {loading && projects.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-zinc-400">
          <RefreshIcon className="animate-spin text-blue-500 mb-2" fontSize="large" />
          <p className="text-sm">{isRTL ? 'جاري تحميل المشاريع...' : 'Loading projects...'}</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div
          className="py-16 text-center rounded-2xl border p-8"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
        >
          <p className="text-base font-medium text-white">
            {isRTL ? 'لا توجد مشاريع تطابق خيارات التصفية' : 'No projects match your filter'}
          </p>
          <p className="text-xs text-zinc-400 mt-1 mb-4">
            {isRTL ? 'جرّب تغيير نوع المشروع أو حالة العرض أو أضف مشروعاً جديداً' : 'Try adjusting the filters or create a new project'}
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <AddIcon fontSize="small" />
            <span>{isRTL ? 'إضافة مشروع' : 'Add Project'}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              {/* Image banner */}
              <div className="relative h-44 bg-zinc-900 overflow-hidden">
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 text-xs gap-1">
                    <ImageIcon fontSize="medium" />
                    <span>{isRTL ? 'بدون صورة' : 'No Image'}</span>
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {project.is_featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/90 text-black shadow-md">
                      <StarIcon style={{ fontSize: 13 }} />
                      <span>{isRTL ? 'مميز' : 'Featured'}</span>
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                      project.is_active
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {project.is_active ? (isRTL ? 'نشط' : 'Active') : isRTL ? 'معطل' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-white line-clamp-1">{project.title}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                      {project.category || 'Web'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Project Link */}
                  {Boolean(project.link || (Array.isArray(project.tags) && project.tags[0]?.startsWith('http'))) && (
                    <div className="mb-4">
                      <a
                        href={project.link || project.tags[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all truncate max-w-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LaunchIcon sx={{ fontSize: 13 }} />
                        <span className="truncate">{(project.link || project.tags[0]).replace(/^https?:\/\//, '')}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Card Action footer */}
                <div
                  className="pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-2">
                    {Boolean(project.link || (Array.isArray(project.tags) && project.tags[0]?.startsWith('http'))) ? (
                      <a
                        href={project.link || project.tags[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <LaunchIcon sx={{ fontSize: 13 }} />
                        <span>{isRTL ? 'زيارة الرابط' : 'Visit Link'}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-500">
                        {isRTL ? 'بدون رابط مباشر' : 'No direct link'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title={isRTL ? 'تعديل' : 'Edit'}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(project.id)}
                      className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title={isRTL ? 'حذف' : 'Delete'}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal with Image File Upload ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b mb-5"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <h2 className="text-lg font-bold text-white">
                {editingProject
                  ? isRTL
                    ? 'تعديل بيانات المشروع'
                    : 'Edit Project'
                  : isRTL
                  ? 'إضافة مشروع جديد'
                  : 'Add New Project'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-lg text-xs bg-red-500/10 border border-red-500/30 text-red-400">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  {isRTL ? 'اسم المشروع' : 'Project Title'} *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Aura Luxe Store"
                  className="w-full px-3.5 py-2 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  {isRTL ? 'تصنيف المشروع (اكتب اسم القسم)' : 'Category (Type Category Name)'} *
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={isRTL ? 'مثال: Websites, E-Commerce, Mobile Apps, AI...' : 'e.g. Websites, E-Commerce, Mobile Apps, AI...'}
                  className="w-full px-3.5 py-2 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                />
              </div>

              {/* ── Image File Upload Section ── */}
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  {isRTL ? 'صورة المشروع (رفع ملف)' : 'Project Image (File Upload)'}
                </label>

                {/* Hidden native file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {/* Upload Card / Preview Box */}
                {imagePreview ? (
                  <div
                    className="p-3 rounded-xl border relative flex items-center gap-3 overflow-hidden"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-color)',
                    }}
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-zinc-700">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">
                        {selectedFileName || (isRTL ? 'الصورة المحددة' : 'Selected Image')}
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        {uploadingImage ? (
                          <span className="text-blue-400 flex items-center gap-1">
                            <RefreshIcon className="animate-spin text-xs" fontSize="inherit" />
                            {isRTL ? 'جاري رفع الصورة إلى الخادم...' : 'Uploading image to server...'}
                          </span>
                        ) : imageUrl ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircleOutlinedIcon fontSize="inherit" />
                            {isRTL ? 'تم رفع الصورة بنجاح' : 'Uploaded successfully'}
                          </span>
                        ) : (
                          <span>{isRTL ? 'جاهز للحفظ' : 'Ready'}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors"
                      >
                        {isRTL ? 'تغيير' : 'Change'}
                      </button>
                      <button
                        type="button"
                        onClick={handleClearImage}
                        disabled={uploadingImage}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title={isRTL ? 'إزالة' : 'Remove'}
                      >
                        <CloseIcon fontSize="small" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/5 flex flex-col items-center justify-center gap-2"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <CloudUploadOutlinedIcon fontSize="medium" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        {isRTL ? 'انقر لاختيار صورة من جهازك' : 'Click to browse and upload image'}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">
                        PNG, JPG, WEBP, SVG (max 10MB)
                      </p>
                    </div>
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-red-400 mt-1.5">{uploadError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1 flex items-center justify-between">
                  <span>{isRTL ? 'رابط المشروع (يفتح في صفحة جديدة عند النقر)' : 'Project Link (Opens in new tab when clicked)'}</span>
                  <span className="text-[10px] text-zinc-400">URL / Link</span>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  {isRTL ? 'الوصف' : 'Description'}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    isRTL
                      ? 'اكتب وصفاً موجزاً عن المشروع والميزات المضمنة...'
                      : 'Brief summary of the project...'
                  }
                  className="w-full px-3.5 py-2 rounded-xl border text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
                />
              </div>

              {/* Switches */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0"
                  />
                  <span>{isRTL ? 'مشروع نشط (يظهر في الموقع)' : 'Active (visible on site)'}</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0"
                  />
                  <span>{isRTL ? 'مشروع مميز (الصفحة الرئيسية)' : 'Featured (Home Page)'}</span>
                </label>
              </div>

              {/* Action buttons */}
              <div
                className="flex items-center justify-end gap-3 pt-5 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 border border-zinc-700 transition-colors"
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting
                    ? isRTL
                      ? 'جاري الحفظ...'
                      : 'Saving...'
                    : isRTL
                    ? 'حفظ المشروع'
                    : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation Modal ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="w-full max-w-sm rounded-2xl border p-6 text-center"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-3">
              <DeleteOutlineOutlinedIcon />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              {isRTL ? 'تأكيد الحذف' : 'Confirm Delete'}
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              {isRTL
                ? 'هل أنت متأكد من رغبتك في حذف هذا المشروع نهائياً'
                : 'Are you sure you want to permanently delete this project?'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs text-zinc-300 hover:bg-white/5 border border-zinc-700"
              >
                {isRTL ? 'تراجع' : 'Cancel'}
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500"
              >
                {isRTL ? 'نعم احذف' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectsManager;
