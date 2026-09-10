"use client";

import { useState } from "react";
import Link from "next/link";

export type Resource = "dashboard" | "users" | "courses";
export type Action = "read" | "write" | "delete";

export interface PermissionMatrix {
  dashboard: { read: boolean; write: boolean; delete: boolean };
  users: { read: boolean; write: boolean; delete: boolean };
  courses: { read: boolean; write: boolean; delete: boolean };
}

export interface UserDraft {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  showPassword?: boolean;
  permissions: PermissionMatrix;
}

const DEFAULT_PERMISSIONS: PermissionMatrix = {
  dashboard: { read: true, write: false, delete: false },
  users: { read: false, write: false, delete: false },
  courses: { read: true, write: true, delete: false },
};

const FULL_PERMISSIONS: PermissionMatrix = {
  dashboard: { read: true, write: true, delete: true },
  users: { read: true, write: true, delete: true },
  courses: { read: true, write: true, delete: true },
};

const READ_ONLY_PERMISSIONS: PermissionMatrix = {
  dashboard: { read: true, write: false, delete: false },
  users: { read: true, write: false, delete: false },
  courses: { read: true, write: false, delete: false },
};

export default function AddUser() {
  const [users, setUsers] = useState<UserDraft[]>([
    {
      id: "user-1",
      name: "",
      email: "",
      password: "",
      role: "Course Manager",
      showPassword: false,
      permissions: { ...DEFAULT_PERMISSIONS },
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createdUsers, setCreatedUsers] = useState<UserDraft[]>([]);

  // Add new blank user card
  const handleAddUserSlot = () => {
    const newId = `user-${Date.now()}`;
    setUsers((prev) => [
      ...prev,
      {
        id: newId,
        name: "",
        email: "",
        password: "",
        role: "Editor",
        showPassword: false,
        permissions: {
          dashboard: { read: true, write: false, delete: false },
          users: { read: false, write: false, delete: false },
          courses: { read: true, write: true, delete: false },
        },
      },
    ]);
  };

  // Remove a user slot
  const handleRemoveUserSlot = (id: string) => {
    if (users.length === 1) {
      alert("At least one user configuration is required.");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // Update text field
  const handleFieldChange = (id: string, field: "name" | "email" | "password" | "role", value: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, [field]: value } : u))
    );
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, showPassword: !u.showPassword } : u))
    );
  };

  // Auto-generate random secure password
  const generatePassword = (id: string) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let gen = "";
    for (let i = 0; i < 12; i++) {
      gen += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, password: gen, showPassword: true } : u))
    );
  };

  // Toggle single permission cell
  const handlePermissionToggle = (userId: string, resource: Resource, action: Action) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const currentVal = u.permissions[resource][action];
        return {
          ...u,
          permissions: {
            ...u.permissions,
            [resource]: {
              ...u.permissions[resource],
              [action]: !currentVal,
            },
          },
        };
      })
    );
  };

  // Preset permission setter
  const applyPreset = (userId: string, preset: "admin" | "editor" | "viewer") => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        if (preset === "admin") {
          return { ...u, permissions: JSON.parse(JSON.stringify(FULL_PERMISSIONS)) };
        } else if (preset === "editor") {
          return { ...u, permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS)) };
        } else {
          return { ...u, permissions: JSON.parse(JSON.stringify(READ_ONLY_PERMISSIONS)) };
        }
      })
    );
  };

  // Set all permissions for a specific row
  const toggleRowPermissions = (userId: string, resource: Resource, forceState?: boolean) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const current = u.permissions[resource];
        const allChecked = current.read && current.write && current.delete;
        const target = forceState !== undefined ? forceState : !allChecked;
        return {
          ...u,
          permissions: {
            ...u.permissions,
            [resource]: { read: target, write: target, delete: target },
          },
        };
      })
    );
  };

  // Set all permissions for a specific column
  const toggleColumnPermissions = (userId: string, action: Action) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const allChecked =
          u.permissions.dashboard[action] &&
          u.permissions.users[action] &&
          u.permissions.courses[action];
        const target = !allChecked;
        return {
          ...u,
          permissions: {
            dashboard: { ...u.permissions.dashboard, [action]: target },
            users: { ...u.permissions.users, [action]: target },
            courses: { ...u.permissions.courses, [action]: target },
          },
        };
      })
    );
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate emails and passwords
    for (let i = 0; i < users.length; i++) {
      const u = users[i];
      if (!u.email.trim() || !u.password.trim()) {
        alert(`Please complete the Email and Password for User #${i + 1}`);
        return;
      }
    }

    setIsSubmitting(true);
    setSuccessMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setCreatedUsers((prev) => [...prev, ...users]);
      setSuccessMessage(`Successfully created ${users.length} user account${users.length > 1 ? "s" : ""}!`);

      // Reset to 1 fresh user slot
      setUsers([
        {
          id: `user-${Date.now()}`,
          name: "",
          email: "",
          password: "",
          role: "Editor",
          showPassword: false,
          permissions: { ...DEFAULT_PERMISSIONS },
        },
      ]);
    }, 800);
  };

  const resources: { key: Resource; label: string; description: string }[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      description: "Overview analytics, high-level metrics, and system activity logs",
    },
    {
      key: "users",
      label: "Users",
      description: "Team accounts, authentication credentials, and user permissions",
    },
    {
      key: "courses",
      label: "Courses",
      description: "Course catalogs, qualification details, intake limits, and listings",
    },
  ];

  const actions: { key: Action; label: string }[] = [
    { key: "read", label: "Read" },
    { key: "write", label: "Write" },
    { key: "delete", label: "Delete" },
  ];

  return (
    <main className="min-h-screen bg-[#faf9ff] py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1360px] mx-auto">
        {/* Breadcrumb & Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-purple-100/90">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-1">
              <Link href="/admin" className="hover:text-[#5a2df5] transition-colors">
                Admin Portal
              </Link>
              <span>/</span>
              <span className="text-[#5a2df5]">Add Users &amp; Permissions</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11111b] tracking-tight">
              Create Admin &amp; Staff Users
            </h1>

            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Set up credentials, assign team roles, and customize granular access controls across
              Dashboard, Users, and Courses.
            </p>
          </div>

          {/* Top Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-purple-200/80 text-xs sm:text-sm font-semibold text-neutral-700 hover:border-[#5a2df5] hover:text-[#5a2df5] transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={handleAddUserSlot}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#5a2df5] hover:bg-[#481ecc] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/35 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Another User</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <span>{successMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-emerald-600 hover:text-emerald-900 text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form Form Container */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* List of User Cards */}
          <div className="space-y-6">
            {users.map((user, index) => {
              return (
                <div
                  key={user.id}
                  className="relative bg-white rounded-3xl border border-purple-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(90,45,245,0.08)] transition-all duration-300 p-6 sm:p-8"
                >
                  {/* Card Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-purple-100/80">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#5a2df5]/10 text-[#5a2df5] font-extrabold text-sm">
                        #{index + 1}
                      </span>
                      <div>
                        <h2 className="text-lg font-bold text-[#11111b]">
                          {user.name.trim() ? user.name : `User Entry #${index + 1}`}
                        </h2>
                        <p className="text-xs text-neutral-400">
                          Configure authentication credentials and system privileges
                        </p>
                      </div>
                    </div>

                    {/* Quick Preset Buttons & Delete Button */}
                    <div className="flex items-center flex-wrap gap-2">
                      <div className="flex items-center gap-1 bg-purple-50/70 p-1 rounded-xl border border-purple-100">
                        <span className="text-[11px] font-bold text-neutral-400 px-2">Presets:</span>
                        <button
                          type="button"
                          onClick={() => applyPreset(user.id, "admin")}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-[#5a2df5] shadow-2xs hover:bg-[#5a2df5] hover:text-white transition-all cursor-pointer"
                        >
                          Full Admin
                        </button>
                        <button
                          type="button"
                          onClick={() => applyPreset(user.id, "editor")}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-neutral-700 shadow-2xs hover:bg-[#5a2df5] hover:text-white transition-all cursor-pointer"
                        >
                          Editor
                        </button>
                        <button
                          type="button"
                          onClick={() => applyPreset(user.id, "viewer")}
                          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white text-neutral-700 shadow-2xs hover:bg-[#5a2df5] hover:text-white transition-all cursor-pointer"
                        >
                          Viewer
                        </button>
                      </div>

                      {users.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveUserSlot(user.id)}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1 cursor-pointer"
                          title="Remove user"
                          aria-label={`Remove user ${index + 1}`}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Top Inputs: Name, Email, Password, Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
                    {/* User Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                        Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleFieldChange(user.id, "name", e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="px-3.5 py-2.5 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400 transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={user.email}
                        onChange={(e) => handleFieldChange(user.id, "email", e.target.value)}
                        placeholder="alex.morgan@blixtor.com.au"
                        className="px-3.5 py-2.5 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400 transition-all"
                      />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-neutral-800 uppercase tracking-wide">
                          Password *
                        </label>
                        <button
                          type="button"
                          onClick={() => generatePassword(user.id)}
                          className="text-[11px] font-semibold text-[#5a2df5] hover:underline"
                        >
                          Auto Generate
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          type={user.showPassword ? "text" : "password"}
                          required
                          value={user.password}
                          onChange={(e) => handleFieldChange(user.id, "password", e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-3.5 pr-10 py-2.5 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 placeholder:text-neutral-400 transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(user.id)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                          aria-label={user.showPassword ? "Hide password" : "Show password"}
                        >
                          {user.showPassword ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                              />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Role Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                        Designation / Role
                      </label>
                      <select
                        value={user.role}
                        onChange={(e) => handleFieldChange(user.id, "role", e.target.value)}
                        className="px-3.5 py-2.5 text-sm rounded-xl bg-purple-50/40 border border-purple-200/80 focus:outline-none focus:border-[#5a2df5] focus:ring-3 focus:ring-[#5a2df5]/10 text-neutral-900 cursor-pointer"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Course Manager">Course Manager</option>
                        <option value="Editor">Content Editor</option>
                        <option value="Admissions Advisor">Admissions Advisor</option>
                        <option value="Support Analyst">Support Analyst</option>
                      </select>
                    </div>
                  </div>

                  {/* =========================================================
                      PERMISSIONS TABLE
                      Rows: Dashboard, Users, Courses
                      Columns: Read, Write, Delete
                  ========================================================== */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                        <span>Access Permissions Matrix</span>
                        <span className="text-[11px] font-normal text-neutral-400">
                          (Configure granular actions for each module)
                        </span>
                      </h3>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-purple-100 shadow-2xs">
                      <table className="w-full text-left text-sm border-collapse bg-white">
                        {/* Table Header */}
                        <thead>
                          <tr className="bg-purple-50/60 border-b border-purple-100 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                            <th className="py-3.5 px-5 min-w-[200px]">Module / Resource</th>
                            {actions.map((act) => (
                              <th key={act.key} className="py-3.5 px-5 text-center min-w-[120px]">
                                <button
                                  type="button"
                                  onClick={() => toggleColumnPermissions(user.id, act.key)}
                                  className="group inline-flex items-center gap-1.5 hover:text-[#5a2df5] transition-colors cursor-pointer"
                                  title={`Toggle all ${act.label} permissions`}
                                >
                                  <span>{act.label}</span>
                                  <svg
                                    className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#5a2df5]"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                    />
                                  </svg>
                                </button>
                              </th>
                            ))}
                            <th className="py-3.5 px-5 text-right min-w-[100px]">Quick Row Actions</th>
                          </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-purple-100/70">
                          {resources.map((res) => {
                            const isAllRowChecked =
                              user.permissions[res.key].read &&
                              user.permissions[res.key].write &&
                              user.permissions[res.key].delete;

                            return (
                              <tr
                                key={res.key}
                                className="hover:bg-purple-50/20 transition-colors group"
                              >
                                {/* Resource Title & Description */}
                                <td className="py-4 px-5">
                                  <div className="flex flex-col">
                                    <span className="font-bold text-neutral-900 text-sm capitalize">
                                      {res.label}
                                    </span>
                                    <span className="text-xs text-neutral-400">
                                      {res.description}
                                    </span>
                                  </div>
                                </td>

                                {/* Action Columns: Read, Write, Delete */}
                                {actions.map((act) => {
                                  const isChecked = user.permissions[res.key][act.key];
                                  return (
                                    <td key={act.key} className="py-4 px-5 text-center">
                                      <label className="inline-flex items-center justify-center p-2 rounded-xl hover:bg-purple-50/80 cursor-pointer transition-colors">
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() =>
                                            handlePermissionToggle(user.id, res.key, act.key)
                                          }
                                          className="w-4 h-4 rounded border-purple-300 text-[#5a2df5] focus:ring-[#5a2df5] accent-[#5a2df5] cursor-pointer"
                                        />
                                        <span className="sr-only">
                                          Allow {act.label} on {res.label}
                                        </span>
                                      </label>
                                    </td>
                                  );
                                })}

                                {/* Row All Action Toggle */}
                                <td className="py-4 px-5 text-right">
                                  <button
                                    type="button"
                                    onClick={() => toggleRowPermissions(user.id, res.key)}
                                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                                      isAllRowChecked
                                        ? "bg-purple-100 text-[#5a2df5] hover:bg-purple-200"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-purple-100 hover:text-[#5a2df5]"
                                    }`}
                                  >
                                    {isAllRowChecked ? "Uncheck All" : "Select All"}
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Form Actions Bar */}
          <div className="sticky bottom-4 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-purple-200/90 shadow-xl shadow-purple-950/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                Ready to create{" "}
                <strong className="text-[#5a2df5]">{users.length}</strong> user account
                {users.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddUserSlot}
                className="px-5 py-2.5 rounded-xl bg-purple-50 text-[#5a2df5] hover:bg-purple-100 text-xs sm:text-sm font-semibold border border-purple-200/80 transition-all cursor-pointer"
              >
                + Add Another User
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#5627ed] via-[#794dfc] to-[#5627ed] bg-[length:200%_100%] hover:bg-[100%_0] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#5a2df5]/25 hover:shadow-lg hover:shadow-[#5a2df5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? "Creating Users..." : `Save & Create ${users.length} User${users.length > 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </form>

        {/* Recently Created Users Preview Section */}
        {createdUsers.length > 0 && (
          <div className="mt-14 pt-10 border-t border-purple-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#11111b]">
                  Recently Created Users ({createdUsers.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Active accounts provisioned during this session
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Active Provisioning
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {createdUsers.map((u, i) => (
                <div
                  key={`${u.id}-${i}`}
                  className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#5a2df5] bg-purple-50 px-2.5 py-0.5 rounded-full">
                        {u.role || "Administrator"}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Created
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-neutral-900 mb-0.5">
                      {u.name || "System User"}
                    </h4>
                    <p className="text-xs text-neutral-500 font-mono mb-4">{u.email}</p>

                    {/* Permissions summary tags */}
                    <div className="space-y-1.5 text-xs text-neutral-600">
                      <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                        <span className="font-medium">Dashboard:</span>
                        <span className="font-semibold text-neutral-800">
                          {[
                            u.permissions.dashboard.read && "Read",
                            u.permissions.dashboard.write && "Write",
                            u.permissions.dashboard.delete && "Delete",
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                        <span className="font-medium">Users:</span>
                        <span className="font-semibold text-neutral-800">
                          {[
                            u.permissions.users.read && "Read",
                            u.permissions.users.write && "Write",
                            u.permissions.users.delete && "Delete",
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="font-medium">Courses:</span>
                        <span className="font-semibold text-neutral-800">
                          {[
                            u.permissions.courses.read && "Read",
                            u.permissions.courses.write && "Write",
                            u.permissions.courses.delete && "Delete",
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}