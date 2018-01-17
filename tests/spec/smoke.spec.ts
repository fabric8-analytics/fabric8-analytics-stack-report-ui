import { browser, by, element, $, $$, ElementFinder, ElementArrayFinder } from 'protractor';

describe('fabric8-analytics-stack-report-ui', () => {
  beforeAll(() => {
    // console.log('browser.params: ', browser.params);
    let appUrl = '#/analyze/' + browser.params.ANALYSES_REQUEST_ID + '?api_data={"access_token":"' + browser.params.RECOMMENDER_API_TOKEN + '","route_config": {"api_url":"' + browser.params.RECOMMENDER_API_END_POINT + '"}}';
    // console.log('stack report url:', browser.baseUrl + appUrl);
    browser.get(appUrl);
  });

  describe('Manifest tabs', () => {
    let tabContainer:ElementFinder = element.all(by.css('.nav.nav-tabs')).get(0);
    let firstTabItem: ElementFinder = tabContainer.$$('.nav-item').get(0);

    it('Is the first tab selected ?', () => {
      expect(firstTabItem.getAttribute('class')).toMatch('nav-item active-menu-item active');
    });

    it('Is the first tab has a warning icon ?', () => {
      expect(firstTabItem.$$('i.pficon-warning-triangle-o').isPresent()).toBe(true);
    });

    it('Is the first tab has a text `pom.xml` ?', () => {
      expect(firstTabItem.$$('span').get(1).getText()).toEqual('pom.xml');;
    });
  });

  describe('Summary Section', () => {
    let reportSummaryContainer: ElementFinder = $('analytics-report-summary .analytics-summary-report');
    let securityCard: ElementFinder = reportSummaryContainer.$$('analytics-summary-card').get(0);
    let insightsCard: ElementFinder = reportSummaryContainer.$$('analytics-summary-card').get(1);
    let licensesCard: ElementFinder = reportSummaryContainer.$$('analytics-summary-card').get(2);
    let componentDetailsCard: ElementFinder = reportSummaryContainer.$$('analytics-summary-card').get(3);
    let titleClassString = 'analytics-summary-title .analytics-summary-title .card-pf-title';

    describe('Security Card', () => {
      it('Is card header `Security Issues`', () => {
        let cardTitle: ElementFinder = securityCard.$$(titleClassString).get(0);
        expect(cardTitle.getText()).toContain('Security Issues');
      });
    });

    describe('Insights Card', () => {
      it('Is card header `Insights`', () => {
        let cardTitle: ElementFinder = insightsCard.$$(titleClassString).get(0);
        expect(cardTitle.getText()).toContain('Insights');
      });
    });

    describe('Licenses Card', () => {
      it('Is card header `Licenses`', () => {
        let cardTitle: ElementFinder = licensesCard.$$(titleClassString).get(0);
        expect(cardTitle.getText()).toContain('Licenses');
      });
    });

    describe('Component Details Card', () => {
      it('Is card header `Component Details`', () => {
        let cardTitle: ElementFinder = componentDetailsCard.$$(titleClassString).get(0);
        expect(cardTitle.getText()).toContain('Component Details');
      });
    });
  });
});
