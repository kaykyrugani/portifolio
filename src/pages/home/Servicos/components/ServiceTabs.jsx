import React from 'react';
import styles from '../Servicos.module.css';

const ServiceTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsWrapper}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
            onClick={() => onTabChange(index)}
            aria-selected={activeTab === index}
            role="tab"
          >
            <span className={styles.tabContent}>
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabText}>{tab.title}</span>
            </span>
            <span className={styles.tabIndicator}></span>
          </button>
        ))}
        <div 
          className={styles.tabsBackground} 
          style={{
            '--active-index': activeTab,
            '--total-tabs': tabs.length
          }}
        />
      </div>
    </div>
  );
};

export default ServiceTabs;
