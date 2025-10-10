{
  /* <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <AppShellLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <OverviewLayout>
                      <PostHome />
                    </OverviewLayout>
                  }
                />

                <Route
                  path="reports"
                  element={
                    <OverviewLayout>
                      <Reports />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="inventory"
                  element={
                    <OverviewLayout>
                      <Inventory />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="automation"
                  element={
                    <OverviewLayout>
                      <Automation />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="user-management"
                  element={
                    <OverviewLayout>
                      <IamManagementLayout />
                    </OverviewLayout>
                  }
                />

                <Route
                  path="insights"
                  element={
                    <OverviewLayout>
                      <InsightsAndBestPractices />
                    </OverviewLayout>
                  }
                />
                <Route
                  path="best-practices"
                  element={
                    <OverviewLayout>
                      <BestPractices />
                    </OverviewLayout>
                  }
                />

                <Route path="devices" element={<DevicesLayout />}>
                  <Route index element={<YourDevices />} />
                  <Route path="purchased" element={<Devices />} />
                  <Route path="connect" element={<ConnectSensorPage />} />
                </Route>

                <Route path="monitoring" element={<LiveMonitoring />} />
                <Route path="alerts" element={<Alerts />} />
                <Route path="component" element={<YourComponent />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              <Route path="shopping.versewave.in" element={<Shopping />} /> */
}
