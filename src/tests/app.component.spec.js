describe('fabric8-analytics-stack-report-ui', function () {
  beforeAll(function () {
    console.log('browser.params: ', browser.params);
    var appUrl = '/#/analyze/' + browser.params.ANALYSES_REQUEST_ID + '?api_data={"access_token":"' + browser.params.RECOMMENDER_API_TOKEN + '","route_config": {"api_url":"' + browser.params.RECOMMENDER_API_END_POINT + '"}}';
    browser.get(appUrl);
  });

  describe('Summary', function () {
    it('Security Alert', function () {
      var securitySummaryHeader = element(by.css('.security-issues-stat h3 span'));
      expect(securitySummaryHeader.getText()).toBe('Security Alert');
      var securitySummaryText = element(by.css('.security-issues-stat .stat-content .center-text'));
      expect(securitySummaryText.getText()).toBe('No CVEs');
    });

    it('Usage Outliers', function () {
      var usageSummaryHeader = element(by.css('.outlier-stat h3 span'));
      expect(usageSummaryHeader.getText()).toBe('Usage Outliers');
      var usageSummaryElem = element(by.css('.outlier-stat .usage-outlier .center-text'));
      expect(usageSummaryElem.getText()).toBe('All the components in your stack work well with each other');
    });

    it('Licenses', function () {
      var licenseSummaryHeader = element(by.css('.stack-license-stat h3 span'));
      expect(licenseSummaryHeader.getText()).toBe('Licenses');
    });
  });
});
