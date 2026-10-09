import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Terminal,
  Layers,
  Award,
  CheckSquare,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projectsData';
import MockIDE from '../components/features/MockIDE';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const project = PROJECTS_DATA.find((p) => p.slug === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-fintech-primary">Project Not Found</h1>
        <p className="text-sm text-slate-500">The requested project case study could not be located.</p>
        <Link
          to="/#projects"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-electric text-white text-xs font-semibold hover:bg-electric-hover transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('projectDetail.backToProjects')}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto py-4">
      {/* Back Navigation Bar */}
      <div>
        <button
          type="button"
          onClick={() => {
            navigate('/#projects');
            // Give react-router time to render landing before scrolling
            setTimeout(() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-md border border-slate-200 bg-white text-xs font-mono text-slate-600 hover:text-electric hover:border-electric transition-colors shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('projectDetail.backToProjects')}</span>
        </button>
      </div>

      {/* Hero Header */}
      <section className="space-y-5 border-b border-slate-200/80 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200">
            {t(project.tagKey)}
          </span>

          {project.statusBadgeKey && (
            <span className="inline-flex items-center space-x-1.5 text-xs font-mono text-electric bg-electric-light px-2.5 py-1 rounded-md border border-electric/30">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-electric" />
              <span>{t(project.statusBadgeKey)}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-fintech-primary">
          {t(project.titleKey)}
        </h1>

        <p className="text-base sm:text-lg text-fintech-secondary max-w-3xl leading-relaxed">
          {t(project.descriptionKey)}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-white border border-slate-200 text-slate-700 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Specifications & Metrics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Specs Box */}
        <div className="md:col-span-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
            <Layers className="w-4 h-4 text-electric" />
            <span>{t('projectDetail.specifications')}</span>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <dt className="text-slate-400">{t('projectDetail.mandate')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5">{project.specs.mandate}</dd>
            </div>
            <div>
              <dt className="text-slate-400">{t('projectDetail.role')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5">{project.specs.role}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-slate-400">{t('projectDetail.architectureOverview')}</dt>
              <dd className="font-semibold text-fintech-primary mt-0.5">{project.specs.architecture}</dd>
            </div>
            {project.specs.evaluation && (
              <div className="sm:col-span-2">
                <dt className="text-slate-400">{t('projectDetail.evaluation')}</dt>
                <dd className="font-semibold text-emerald-600 mt-0.5">{project.specs.evaluation}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Right: Key Highlights */}
        <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200/80 pb-2">
            <Award className="w-4 h-4 text-electric" />
            <span>{t('projectDetail.keyHighlights')}</span>
          </div>

          <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckSquare className="w-3.5 h-3.5 text-electric flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Code Showcase & Implementation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-electric" />
            <h2 className="text-lg font-bold tracking-tight text-fintech-primary">
              {t('projectDetail.simulatedCode')}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {project.filename}
          </span>
        </div>

        <MockIDE
          filename={project.filename}
          code={project.code}
        />
      </section>
    </div>
  );
};

export default ProjectDetail;
