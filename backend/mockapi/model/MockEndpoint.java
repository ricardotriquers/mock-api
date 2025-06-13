@Entity
@Table(name = "mock_endpoints")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MockEndpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String path;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HttpMethod httpMethod;
    
    @Column(columnDefinition = "TEXT")
    private String requestBodyPattern;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String responseBody;
    
    @Column(nullable = false)
    private int responseStatus;
    
    @Column
    private Map<String, String> responseHeaders;
    
    @Column
    private Integer delayInMillis;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private boolean active = true;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}